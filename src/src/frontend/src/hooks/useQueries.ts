import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";
import type { Game, UserProfile, Platform } from "../backend.d";
import { ExternalBlob } from "../backend";

// Games
export function useGetAllGames() {
  const { actor, isFetching } = useActor();
  return useQuery<Game[]>({
    queryKey: ["games"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllGames();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetGameById(id: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Game | null>({
    queryKey: ["game", id],
    queryFn: async () => {
      if (!actor || !id) return null;
      return actor.getGameById(id);
    },
    enabled: !!actor && !isFetching && !!id,
  });
}

interface CreateGameData {
  name: string;
  posterBlob: ExternalBlob;
  price: bigint;
  trailerUrl: string;
  platforms: Platform[];
  onSale: boolean;
}

export function useCreateGame() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateGameData) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createGame(
        data.name,
        data.posterBlob,
        data.price,
        data.trailerUrl,
        data.platforms,
        data.onSale
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
    },
  });
}

interface UpdateGameData extends CreateGameData {
  id: string;
}

export function useUpdateGame() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateGameData) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateGame(
        data.id,
        data.name,
        data.posterBlob,
        data.price,
        data.trailerUrl,
        data.platforms,
        data.onSale
      );
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      queryClient.invalidateQueries({ queryKey: ["game", variables.id] });
    },
  });
}

export function useDeleteGame() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteGame(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
    },
  });
}

// User Profile
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Actor not available");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
}

// Admin Check
export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isCallerAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}
