import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Example } from './pages/example/example';
<<<<<<< HEAD
import { CrearPublicacion } from './pages/crear-publicacion/crear-publicacion';
=======
import { Projects } from './pages/projects/projects';
>>>>>>> 68c534381b54a9b43228daa11f1c196620813284

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'blog',
        component: Example
    },
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
