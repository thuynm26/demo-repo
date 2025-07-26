import { test as base } from './conf.fixture';
import { ProductPage } from '../pages/product-page';
import { LoginPage } from '../pages/login-page';

export const test = base.extend<{ product: ProductPage}>({
    product: async ({ page, conf }, use) => {
        const dashboardDomain = conf.url_dashboard;
        const userName = conf.user_name;
        const password = conf.password;
        const productInfo = conf.product;

        const productPage = new ProductPage(dashboardDomain, page);
        const loginPage = new LoginPage(dashboardDomain, page);

        // Login 
        await loginPage.openHomePage();
        await loginPage.logIn(userName, password);

        // Go to Product page
        await loginPage.navigateToMenu("Products", "Add new product");

        // Run test steps
        await use(productPage);

        // Teardown: Delete product that be created before 
        await productPage.openHomePage();
        await productPage.navigateToMenu("Products", "All Products");
        await productPage.moveProductToTrash(productInfo.productName);
    }
});

export { expect } from '@playwright/test';