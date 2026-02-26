import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { BlogPage } from './pages/blog/blog';
import { CrearPublicacion } from './pages/crear-publicacion/crear-publicacion';
import { Projects } from './pages/projects/projects';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'blog',
        component: BlogPage
    },
    // Solo para el equipo: no hay enlaces en la web. Acceso escribiendo la URL: /blog/crear
    {
        path: 'blog/crear',
        component: CrearPublicacion
    },
    {
        path: 'servicios',
        redirectTo: '', // Redirige a la página principal
        pathMatch: 'full'
    },
    {
        path: 'proyectos',
        component: Projects
    }
];
