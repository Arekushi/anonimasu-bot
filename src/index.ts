import 'reflect-metadata';

import { env } from './environments';
import { locale } from './locale';
import { run } from './server';


env();
locale();

run();
