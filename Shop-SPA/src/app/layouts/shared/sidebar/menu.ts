import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'Menu',
        isTitle: true
    },
    {
        id: 2,
        label: 'Dashboard',
        icon: 'ri-dashboard-line',
        // badge: {
        //     variant: 'success',
        //     text: 'BADGE',
        // },
        link: '/'
    },
    {
        id: 3,
        label: 'Dues',
        icon: 'ri-calendar-todo-fill',
        link: '/calendar'
    },
    
    {
        id: 3,
        label: 'Company',
        icon: ' fas fa-address-card',
        link: '/company'
    },
    {
        id: 4,
        label: 'Braches',
        icon: 'fas fa-code-branch',
        link: '/branch'
    },
    {
        id: 5,
        label: 'Masters',
        icon: 'ri-table-2',
        subItems: [
            {
                id: 6,
                label: 'Party Type',
                link: '/partytype',
                parentId: 5
            },
            {
                id: 7,
                label: 'Party Master',
                link: '/party',
                parentId: 5
            },
            {
                id: 8,
                label: 'Product Brands',
                link: '/brand',
                parentId: 5
            },
            {
                id: 9,
                label: 'Product Category',
                link: '/category',
                parentId: 5
            },
            {
                id: 10,
                label: 'Product Master',
                link: '/product/list',
                parentId: 5
            },
            {
                id: 11,
                label: 'Add New Product',
                link: '/product/add',
                parentId: 5
            },
            {
                id: 12,
                label: 'Branch Product Details',
                link: '/branch/products',
                parentId: 5
            },
        ]
    },
    {
        id: 14,
        label: 'Sales',
        icon: 'fas fa-store-alt',
        subItems: [
            {
                id: 16,
                label: 'New Sale',
                link: '/order/sale',
                parentId: 14
            },
            {
                id: 17,
                label: 'Sale Orders',
                link: '/order/sale/list',
                parentId: 14
            },
            {
                id: 18,
                label: 'Sale Returns',
                link: '/order/sale/return/list',
                parentId: 14
            },
            {
                id: 19,
                label: 'Add Sale Returns',
                link: '/order/sale/return',
                parentId: 14
            }
        ]
    },
    {
        id: 18,
        label: 'Purchase',
        icon: 'fas fa-cart-plus',
        subItems: [
            {
                id: 19,
                label: 'Create Invoice',
                link: '/order/purchase',
                parentId: 18
            },
            {
                id: 20,
                label: 'Purchase List',
                link: '/order/purchase/list',
                parentId: 18
            },
            {
                id: 21,
                label: 'Purchase Returns',
                link: '/order/purchase/return/list',
                parentId: 18
            }
        ]
    },
    {
        id: 21,
        label: 'Inventory',
        icon: 'ri-rhythm-line',
        subItems: [
            {
                id: 24,
                label: 'Stocks',
                link: '/order/stock/list',
                parentId: 23
            },
            {
                id: 25,
                label: 'Stock Returns',
                link: '/order/stock/return/list',
                parentId: 23
            },
            {
                id: 27,
                label: 'Stock Transfer',
                link: '/order/stock/transfer/list',
                parentId: 23
            }
        ]
    },
    {
        id: 32,
        label: 'Account',
        icon: 'ri-wallet-3-fill',
        subItems: [
            {
                id: 33,
                label: 'Bank Master',
                link: '/bank',
                parentId: 32
            },
            {
                id: 34,
                label: 'Payment',
                link: '/payment',
                parentId: 32
            },
        ]
    },
    {
        id: 35,
        label: 'Sales Reports',
        icon: 'ri-file-list-3-fill',
        // badge: {
        //     variant: 'danger',
        //     text: '6'
        // },
        subItems: [
            {
                id: 36,
                label: 'Sales(Warehouse)',
                link: '/',
                parentId: 35
            },
            {
                id: 37,
                label: 'Sales Summary',
                link: '/',
                parentId: 35
            },
            {
                id: 38,
                label: 'Sales Due List',
                link: '/sales/duelist',
                parentId: 35
            },
            {
                id: 39,
                label: 'Sales Daily',
                link: '/',
                parentId: 35
            },
            {
                id: 39,
                label: 'Sales Details',
                link: '/sales/details',
                parentId: 35
            },
        ]
    },
    {
        id: 57,
        label: 'Inventory Reports',
        icon: 'ri-survey-line',
        subItems: [
            {
                id: 58,
                label: 'Stock Warehouse',
                link: '/stock/warehouse',
                parentId: 57
            },
            {
                id: 59,
                label: 'ItemWise Purchase',
                link: '/purchase/itemwise',
                parentId: 57
            },
            {
                id: 60,
                label: 'ItemWise Sale',
                link: '/sales/itemwise',
                parentId: 57
            },
            {
                id: 61,
                label: 'Branch Inventory',
                link: '/tables/advanced',
                parentId: 57
            },
            {
                id: 62,
                label: 'Stock Ledger',
                link: '/stock/ledger',
                parentId: 57
            }
        ]
    },
    {
        id: 60,
        label: 'Account Reports',
        icon: ' ri-article-line',
        subItems: [
            {
                id: 61,
                label: 'Payment Status',
                link: '/payment/party/status',
                parentId: 60
            },
            {
                id: 61,
                label: 'Pay Daily Summary',
                link: '/charts/chartjs',
                parentId: 60
            },
            {
                id: 62,
                label: 'Party Ledger',
                link: '/party/ledger',
                parentId: 60
            },
            {
                id: 63,
                label: 'Pary Status',
                link: '/charts/echart',
                parentId: 60
            }
        ]
    },
    // {
    //     id: 63,
    //     label: 'Settings',
    //     icon: 'ri-brush-line',
    //     subItems: [
    //         {
    //             id: 64,
    //             label: 'MENUITEMS.ICONS.LIST.REMIX',
    //             link: '/icons/remix',
    //             parentId: 63
    //         },
    //         {
    //             id: 65,
    //             label: 'MENUITEMS.ICONS.LIST.MATERIALDESIGN',
    //             link: '/icons/materialdesign',
    //             parentId: 63
    //         },
    //         {
    //             id: 66,
    //             label: 'MENUITEMS.ICONS.LIST.DRIPICONS',
    //             link: '/icons/dripicons',
    //             parentId: 63
    //         },
    //         {
    //             id: 67,
    //             label: 'MENUITEMS.ICONS.LIST.FONTAWESOME',
    //             link: '/icons/fontawesome',
    //             parentId: 63
    //         }
    //     ]
    // },
    // {
    //     id: 68,
    //     label: 'Utility',
    //     icon: 'ri-map-pin-line',
    //     subItems: [
    //         {
    //             id: 69,
    //             label: 'Change Password',
    //             link: '/maps/google',
    //             parentId: 68
    //         },
    //         {
    //             id: 70,
    //             label: '',
    //             link: '/maps/leaflet',
    //             parentId: 68
    //         },
    //     ]
    // },
    {
        id: 69,
        label: 'Logout',
        icon: 'ri-share-line'
    }
];
