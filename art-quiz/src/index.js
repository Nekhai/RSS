'use strict';

import './styles/style.scss';

import { Home } from './pages/Home';
import { Categories } from './pages/Categories';
import { Settings } from './pages/Settings';
import { Errors } from './pages/Errors';
import { Questions } from './pages/Questions'
import { Results } from './pages/Results'

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { Utils } from './utils/Utils';
import images from './images';
import { cutArray } from './utils/navigation';

cutArray(images, 10);
const homeInstance = new Home();
const settingsSettings = new Settings();
const categoriesInstance = new Categories();
const questionsInstance = new Questions();
const resultInstance = new Results();
const errorInstance = new Errors();

const headerInstance = new Header();
const footerInstance = new Footer();

const routes = {
  '/': homeInstance,
  '/settings': settingsSettings,
  '/categories': categoriesInstance,
  '/questions': questionsInstance,
  '/results': resultInstance,
};

const router = async () => {
  const header = null || document.getElementById('header_container');
  const content = null || document.getElementById('page_container');
  const footer = null || document.getElementById('footer_container');

  header.innerHTML = await headerInstance.render();
  await headerInstance.after_render();

  footer.innerHTML = await footerInstance.render();
  await footerInstance.after_render();

  const request = Utils.parseRequestURL();

  const parsedURL = (request.resource ? `/${request.resource}` : '/') + (request.id ? '/:id' : '') + (request.verb ? `/${request.verb}` : '');

  const page = routes[parsedURL] ? routes[parsedURL] : errorInstance;

  content.innerHTML = await page.render();

  await page.after_render();
};



window.addEventListener('hashchange', router);
window.addEventListener('load', router);
