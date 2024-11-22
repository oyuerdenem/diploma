# Details

Date : 2024-11-21 23:57:05

Directory /Users/oyuerdenem/diploma

Total : 95 files,  30736 codes, 390 comments, 680 blanks, all 31806 lines

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [.env](/.env) | Properties | 4 | 0 | 0 | 4 |
| [backend/config/db.js](/backend/config/db.js) | JavaScript | 10 | 0 | 2 | 12 |
| [backend/controller/auth/auth.controller.js](/backend/controller/auth/auth.controller.js) | JavaScript | 55 | 0 | 10 | 65 |
| [backend/controller/branch/branch.controller.js](/backend/controller/branch/branch.controller.js) | JavaScript | 124 | 0 | 15 | 139 |
| [backend/controller/category/category.controller.js](/backend/controller/category/category.controller.js) | JavaScript | 73 | 0 | 12 | 85 |
| [backend/controller/cuisine/cuisine.controller.js](/backend/controller/cuisine/cuisine.controller.js) | JavaScript | 76 | 56 | 22 | 154 |
| [backend/controller/cuisineType/cuisineType.controller.js](/backend/controller/cuisineType/cuisineType.controller.js) | JavaScript | 67 | 0 | 12 | 79 |
| [backend/controller/menuItem/menuItem.controller.js](/backend/controller/menuItem/menuItem.controller.js) | JavaScript | 118 | 0 | 18 | 136 |
| [backend/controller/order/order.controller.js](/backend/controller/order/order.controller.js) | JavaScript | 104 | 4 | 18 | 126 |
| [backend/controller/orderItem/orderItem.controller.js](/backend/controller/orderItem/orderItem.controller.js) | JavaScript | 72 | 19 | 15 | 106 |
| [backend/controller/product/product.controller.js](/backend/controller/product/product.controller.js) | JavaScript | 62 | 0 | 12 | 74 |
| [backend/controller/restaurant/restaurant.controller.js](/backend/controller/restaurant/restaurant.controller.js) | JavaScript | 108 | 0 | 16 | 124 |
| [backend/controller/staff/staff.controller.js](/backend/controller/staff/staff.controller.js) | JavaScript | 49 | 0 | 7 | 56 |
| [backend/controller/table/table.controller.js](/backend/controller/table/table.controller.js) | JavaScript | 69 | 0 | 12 | 81 |
| [backend/controller/tableqr/tableqr.controller.js](/backend/controller/tableqr/tableqr.controller.js) | JavaScript | 27 | 0 | 5 | 32 |
| [backend/controller/user/user.controller.js](/backend/controller/user/user.controller.js) | JavaScript | 47 | 0 | 7 | 54 |
| [backend/middlewares/authMiddleware.js](/backend/middlewares/authMiddleware.js) | JavaScript | 17 | 0 | 3 | 20 |
| [backend/middlewares/roleMiddleware.js](/backend/middlewares/roleMiddleware.js) | JavaScript | 8 | 0 | 3 | 11 |
| [backend/models/branch/branch.model.js](/backend/models/branch/branch.model.js) | JavaScript | 83 | 0 | 4 | 87 |
| [backend/models/category/category.model.js](/backend/models/category/category.model.js) | JavaScript | 35 | 0 | 4 | 39 |
| [backend/models/cuisine/cuisine.model.js](/backend/models/cuisine/cuisine.model.js) | JavaScript | 35 | 11 | 4 | 50 |
| [backend/models/cuisineType/cuisineType.model.js](/backend/models/cuisineType/cuisineType.model.js) | JavaScript | 30 | 0 | 4 | 34 |
| [backend/models/customer/customer.model.js](/backend/models/customer/customer.model.js) | JavaScript | 31 | 0 | 5 | 36 |
| [backend/models/menuItem/menuItem.model.js](/backend/models/menuItem/menuItem.model.js) | JavaScript | 33 | 0 | 4 | 37 |
| [backend/models/order/order.model.js](/backend/models/order/order.model.js) | JavaScript | 49 | 0 | 4 | 53 |
| [backend/models/orderItem/orderItem.model.js](/backend/models/orderItem/orderItem.model.js) | JavaScript | 37 | 1 | 5 | 43 |
| [backend/models/payment/payment.model.js](/backend/models/payment/payment.model.js) | JavaScript | 35 | 0 | 4 | 39 |
| [backend/models/product/product.model.js](/backend/models/product/product.model.js) | JavaScript | 15 | 0 | 4 | 19 |
| [backend/models/restaurant/restaurant.model.js](/backend/models/restaurant/restaurant.model.js) | JavaScript | 26 | 0 | 4 | 30 |
| [backend/models/staff/staff.model.js](/backend/models/staff/staff.model.js) | JavaScript | 59 | 0 | 5 | 64 |
| [backend/models/table/table.model.js](/backend/models/table/table.model.js) | JavaScript | 37 | 0 | 4 | 41 |
| [backend/models/tableqr/tableqr.model.js](/backend/models/tableqr/tableqr.model.js) | JavaScript | 35 | 0 | 4 | 39 |
| [backend/models/user/user.model.js](/backend/models/user/user.model.js) | JavaScript | 23 | 0 | 4 | 27 |
| [backend/models/validators.js](/backend/models/validators.js) | JavaScript | 11 | 5 | 8 | 24 |
| [backend/routes/auth/auth.route.js](/backend/routes/auth/auth.route.js) | JavaScript | 6 | 0 | 4 | 10 |
| [backend/routes/branch/branch.routes.js](/backend/routes/branch/branch.routes.js) | JavaScript | 15 | 0 | 4 | 19 |
| [backend/routes/category/category.routes.js](/backend/routes/category/category.routes.js) | JavaScript | 13 | 0 | 4 | 17 |
| [backend/routes/cuisine/cuisine.routes.js](/backend/routes/cuisine/cuisine.routes.js) | JavaScript | 13 | 0 | 4 | 17 |
| [backend/routes/cuisineTypes/cuisineTypes.routes.js](/backend/routes/cuisineTypes/cuisineTypes.routes.js) | JavaScript | 13 | 0 | 4 | 17 |
| [backend/routes/menuItem/menuItem.routes.js](/backend/routes/menuItem/menuItem.routes.js) | JavaScript | 16 | 0 | 4 | 20 |
| [backend/routes/order/order.routes.js](/backend/routes/order/order.routes.js) | JavaScript | 16 | 0 | 4 | 20 |
| [backend/routes/orderItem/orderItem.routes.js](/backend/routes/orderItem/orderItem.routes.js) | JavaScript | 10 | 0 | 4 | 14 |
| [backend/routes/product/product.routes.js](/backend/routes/product/product.routes.js) | JavaScript | 13 | 0 | 4 | 17 |
| [backend/routes/qr/tableqr.routes.js](/backend/routes/qr/tableqr.routes.js) | JavaScript | 6 | 0 | 4 | 10 |
| [backend/routes/restaurant/restaurant.routes.js](/backend/routes/restaurant/restaurant.routes.js) | JavaScript | 15 | 0 | 4 | 19 |
| [backend/routes/staff/staff.routes.js](/backend/routes/staff/staff.routes.js) | JavaScript | 11 | 1 | 5 | 17 |
| [backend/routes/table/table.routes.js](/backend/routes/table/table.routes.js) | JavaScript | 9 | 2 | 5 | 16 |
| [backend/routes/user/user.routes.js](/backend/routes/user/user.routes.js) | JavaScript | 13 | 0 | 4 | 17 |
| [backend/server.js](/backend/server.js) | JavaScript | 63 | 16 | 13 | 92 |
| [frontend/README.md](/frontend/README.md) | Markdown | 38 | 0 | 33 | 71 |
| [frontend/dist/output.css](/frontend/dist/output.css) | CSS | 331 | 165 | 78 | 574 |
| [frontend/package-lock.json](/frontend/package-lock.json) | JSON | 20,522 | 0 | 1 | 20,523 |
| [frontend/package.json](/frontend/package.json) | JSON | 56 | 0 | 1 | 57 |
| [frontend/postcss.config.js](/frontend/postcss.config.js) | JavaScript | 6 | 0 | 1 | 7 |
| [frontend/public/index.html](/frontend/public/index.html) | HTML | 20 | 23 | 1 | 44 |
| [frontend/public/manifest.json](/frontend/public/manifest.json) | JSON | 25 | 0 | 1 | 26 |
| [frontend/src/App.css](/frontend/src/App.css) | CSS | 33 | 0 | 6 | 39 |
| [frontend/src/App.js](/frontend/src/App.js) | JavaScript | 74 | 7 | 11 | 92 |
| [frontend/src/App.test.js](/frontend/src/App.test.js) | JavaScript | 7 | 0 | 2 | 9 |
| [frontend/src/actions/client/actions.js](/frontend/src/actions/client/actions.js) | JavaScript | 24 | 0 | 6 | 30 |
| [frontend/src/components/buttons/client-button.tsx](/frontend/src/components/buttons/client-button.tsx) | TypeScript JSX | 65 | 1 | 5 | 71 |
| [frontend/src/components/buttons/client-order-button.tsx](/frontend/src/components/buttons/client-order-button.tsx) | TypeScript JSX | 45 | 6 | 4 | 55 |
| [frontend/src/components/formatter/format-total.tsx](/frontend/src/components/formatter/format-total.tsx) | TypeScript JSX | 12 | 0 | 6 | 18 |
| [frontend/src/components/global-header/header.js](/frontend/src/components/global-header/header.js) | JavaScript | 48 | 0 | 6 | 54 |
| [frontend/src/components/protected-route.js](/frontend/src/components/protected-route.js) | JavaScript | 8 | 0 | 3 | 11 |
| [frontend/src/components/reusable/order-card.js](/frontend/src/components/reusable/order-card.js) | JavaScript | 32 | 1 | 3 | 36 |
| [frontend/src/components/reusable/order-food-item.js](/frontend/src/components/reusable/order-food-item.js) | JavaScript | 16 | 1 | 1 | 18 |
| [frontend/src/components/reusable/order-item.js](/frontend/src/components/reusable/order-item.js) | JavaScript | 52 | 1 | 5 | 58 |
| [frontend/src/components/reusable/order-pay-item.js](/frontend/src/components/reusable/order-pay-item.js) | JavaScript | 29 | 0 | 3 | 32 |
| [frontend/src/components/reusable/order-summary.tsx](/frontend/src/components/reusable/order-summary.tsx) | TypeScript JSX | 191 | 1 | 12 | 204 |
| [frontend/src/components/reusable/search-input.js](/frontend/src/components/reusable/search-input.js) | JavaScript | 12 | 0 | 3 | 15 |
| [frontend/src/global.d.ts](/frontend/src/global.d.ts) | TypeScript | 20 | 0 | 5 | 25 |
| [frontend/src/index.css](/frontend/src/index.css) | CSS | 7 | 0 | 2 | 9 |
| [frontend/src/index.js](/frontend/src/index.js) | JavaScript | 12 | 0 | 2 | 14 |
| [frontend/src/layout/main-layout/main-layout.js](/frontend/src/layout/main-layout/main-layout.js) | JavaScript | 15 | 0 | 4 | 19 |
| [frontend/src/layout/sidebar/sidebar.js](/frontend/src/layout/sidebar/sidebar.js) | JavaScript | 144 | 2 | 13 | 159 |
| [frontend/src/pages/admin-dashboard/dashboard-page.js](/frontend/src/pages/admin-dashboard/dashboard-page.js) | JavaScript | 10 | 0 | 2 | 12 |
| [frontend/src/pages/admin-dashboard/dashboard.js](/frontend/src/pages/admin-dashboard/dashboard.js) | JavaScript | 257 | 0 | 10 | 267 |
| [frontend/src/pages/admin-login/login.js](/frontend/src/pages/admin-login/login.js) | JavaScript | 127 | 1 | 9 | 137 |
| [frontend/src/pages/admin-menu/menu-edit/menu-edit.js](/frontend/src/pages/admin-menu/menu-edit/menu-edit.js) | JavaScript | 137 | 0 | 13 | 150 |
| [frontend/src/pages/admin-menu/menu-page.js](/frontend/src/pages/admin-menu/menu-page.js) | JavaScript | 10 | 0 | 2 | 12 |
| [frontend/src/pages/admin-menu/menu.jsx](/frontend/src/pages/admin-menu/menu.jsx) | JavaScript JSX | 190 | 11 | 16 | 217 |
| [frontend/src/pages/admin-order/order-page.js](/frontend/src/pages/admin-order/order-page.js) | JavaScript | 10 | 0 | 2 | 12 |
| [frontend/src/pages/admin-order/order.js](/frontend/src/pages/admin-order/order.js) | JavaScript | 112 | 11 | 7 | 130 |
| [frontend/src/pages/client-home/home.js](/frontend/src/pages/client-home/home.js) | JavaScript | 74 | 0 | 8 | 82 |
| [frontend/src/pages/client-menu/menu.js](/frontend/src/pages/client-menu/menu.js) | JavaScript | 225 | 39 | 28 | 292 |
| [frontend/src/pages/client-pay/pay.tsx](/frontend/src/pages/client-pay/pay.tsx) | TypeScript JSX | 148 | 0 | 15 | 163 |
| [frontend/src/reportWebVitals.js](/frontend/src/reportWebVitals.js) | JavaScript | 12 | 0 | 2 | 14 |
| [frontend/src/services/websocket-service.js](/frontend/src/services/websocket-service.js) | JavaScript | 36 | 0 | 10 | 46 |
| [frontend/src/setupTests.js](/frontend/src/setupTests.js) | JavaScript | 1 | 4 | 1 | 6 |
| [frontend/src/utils/alert/alert.js](/frontend/src/utils/alert/alert.js) | JavaScript | 29 | 0 | 3 | 32 |
| [frontend/tailwind.config.js](/frontend/tailwind.config.js) | JavaScript | 10 | 1 | 0 | 11 |
| [frontend/tsconfig.json](/frontend/tsconfig.json) | JSON with Comments | 8 | 0 | 1 | 9 |
| [package-lock.json](/package-lock.json) | JSON | 5,566 | 0 | 1 | 5,567 |
| [package.json](/package.json) | JSON | 34 | 0 | 1 | 35 |

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)