import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import Order "mo:core/Order";

actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile System
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    AccessControl.initialize(accessControlState, caller, "", "");
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Game Management System
  public type Platform = { #pc; #xbox; #playstation };

  public type Game = {
    id : Text;
    name : Text;
    posterBlob : Storage.ExternalBlob;
    price : Nat;
    trailerUrl : Text;
    platforms : [Platform];
    onSale : Bool;
  };

  let games = Map.empty<Text, Game>();

  module Game {
    public func compare(game1 : Game, game2 : Game) : Order.Order {
      Text.compare(game1.name, game2.name);
    };
  };

  let maxIdLength = 8;

  func generateGameId(name : Text) : Text {
    let chars = name.toArray();
    let truncatedChars = chars.sliceToArray(0, maxIdLength);
    Text.fromArray(truncatedChars);
  };

  // Admin-only: Create new game
  public shared ({ caller }) func createGame(name : Text, posterBlob : Storage.ExternalBlob, price : Nat, trailerUrl : Text, platforms : [Platform], onSale : Bool) : async Text {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can create games");
    };

    let id = generateGameId(name);

    let game : Game = {
      id;
      name;
      posterBlob;
      price;
      trailerUrl;
      platforms;
      onSale;
    };

    games.add(id, game);
    id;
  };

  // Admin-only: Update existing game
  public shared ({ caller }) func updateGame(id : Text, name : Text, posterBlob : Storage.ExternalBlob, price : Nat, trailerUrl : Text, platforms : [Platform], onSale : Bool) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update games");
    };

    let game : Game = {
      id;
      name;
      posterBlob;
      price;
      trailerUrl;
      platforms;
      onSale;
    };

    if (not games.containsKey(id)) {
      Runtime.trap("Game does not exist");
    };

    games.add(id, game);
  };

  // Admin-only: Delete game
  public shared ({ caller }) func deleteGame(id : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete games");
    };

    if (not games.containsKey(id)) {
      Runtime.trap("Game does not exist");
    };

    games.remove(id);
  };

  // Public: Get all games
  public query ({ caller }) func getAllGames() : async [Game] {
    games.values().toArray().sort();
  };

  // Public: Get game by ID
  public query ({ caller }) func getGameById(id : Text) : async Game {
    switch (games.get(id)) {
      case (null) { Runtime.trap("Game does not exist") };
      case (?game) { game };
    };
  };
};
