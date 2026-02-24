import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Example } from './pages/example/example';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'blogs',
        component: Example
    }];
