export function getCurrentUserNetID() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userID');
    }
    return null;
  }
  
  export function isUserLoggedIn() {
    return !!getCurrentUserNetID();
  }
  
  export function hasStaffAccess() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('hasStaffAccess') === 'true';
    }
    return false;
  }
  
  export function logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userID');
      localStorage.removeItem('hasStaffAccess');
    }
  }