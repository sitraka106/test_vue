import { useAuthStore } from '../stores/auth';
export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  console.log('Middleware 1');

  const isAuthenticated = await authStore.checkAuth();
  console.log('Middleware 2');

  if (!isAuthenticated) {
    // Token is invalid or expired, redirect to login
    console.log('Token is invalid or expired, redirect to login');
    return navigateTo('/login');
  }

  // Check if the token is expired
  const currentTime = new Date().getTime(); // Current time in milliseconds
  const tokenExpiration = authStore.tokenExpiration;

  if (tokenExpiration && currentTime > tokenExpiration) {
    // Token expired, log out and redirect to login
    console.log('Token expired, log out and redirect to login');
    // authStore.logout();
    return navigateTo('/login');
  }

  // Check user role for restricted routes
  if (to.path.startsWith('/admin') && authStore.user.role !== 'admin') {
    return navigateTo('/');
  }
});
