# Dragon Games Store

## Current State

The application has:
- Full admin dashboard UI at `/admin/dashboard` with game management (add/edit/delete)
- Admin game form page at `/admin/game/new` and `/admin/game/:id`
- Backend with `isCallerAdmin()` check and `assignCallerUserRole()` function
- Header that shows "Admin Dashboard" button only when `isCallerAdmin()` returns true
- User authentication via Internet Identity

**Problem**: After a user logs in, they have no admin privileges. The admin dashboard exists but is inaccessible because there's no mechanism to grant the first user admin access.

## Requested Changes (Diff)

### Add
- Backend logic to automatically grant admin role to the **first user** who logs in or creates a profile
- This ensures the store owner can immediately access the admin panel after their first login

### Modify
- Backend `saveCallerUserProfile` function to check if this is the first user and automatically assign admin role
- Alternatively, modify `getCallerUserRole` to return admin for the first registered user

### Remove
- Nothing

## Implementation Plan

1. Modify `saveCallerUserProfile` to call `AccessControl.initialize()` with an empty admin token requirement
2. The first user who saves their profile will automatically become admin
3. All subsequent users will get the "user" role
4. Ensure the admin can access the admin dashboard after login

## UX Notes

- After the fix, when the store owner logs in for the first time, they will immediately see "Admin Dashboard" button in the header
- Clicking it will take them to `/admin/dashboard` where they can add, edit, and delete games
- Regular customers who visit later will not get admin access
