// params: user, token

//method: post
//url: /systemdata
//body: { user, token }
//response: { user, token }

export const dataLogin =
    {
        user: {
            id: 1,
            name: 'admin',
            email: 'admin@admin.com',
            password: 'admin123',
            username: 'admin',
            avatar: 'https://i.pravatar.cc/150?img=1',
            roles: ['admin'],
            permissions: ['list', 'create']
        },
        token: '123456'
    }

export const company = {
    id: 1,
    name: 'TECH SOL',
    // random logo
    logo: `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`,
    logoKey: null,
    description: 'Tech Solutions',
    header: 'Tech Solutions',
    contact: 'Tech Solutions',
    support: '+57 317 890 1234',
    social: 'https://www.facebook.com/techsolutions,https://www.instagram.com/techsolutions,https://www.twitter.com/techsolutions',
    footer: 'Tech Solutions',
    terms: 'Tech Solutions Terms',
    policy: 'Tech Solutions Policy',
    createdAt: new Date(),
    updatedAt: new Date()
}
//shops
export const shops = [
    {
        id: 1,
        name: "tienda A",
        location: "-12333232,12323213",
        address: "calle sucre, #45",
        phone: "+591 60427039",
        store_front: "https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}",
        show_fonnt_key: "123456"
    },
    {
        id: 2,
        name: "tienda B",
        location: "-12333232,12323213",
        address: "calle sucre, #45",
        phone: "+591 60427039",
        store_front: "https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}",
        show_fonnt_key: "123456"
    },
    {
        id: 3,
        name: "tienda C",
        location: "-12333232,12323213",
        address: "calle sucre, #45",
        phone: "+591 60427039",
        store_front: "https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}",
        show_fonnt_key: "123456"
    }
] 
//Data for categories
export const categories = [
    {
        id: 1,
        name: "category 1",
        slug: "category-1",
        color: "#000000",
        icon: "fa-solid fa-circle-dot"
    },
    {
        id: 2,
        name: "category 2",
        slug: "category-2",
        color: "#000000",
        icon: "fa-solid fa-circle-dot"
    },
    {
        id: 3,
        name: "category 3",
        slug: "category-3",
        color: "#000000",
        icon: "fa-solid fa-circle-dot"
    },
    {
        id: 4,
        name: "category 4",
        slug: "category-4",
        color: "#000000",
        icon: "fa-solid fa-circle-dot"
    }
]
// data for subcategories
export const subcategories = [
    {
        id: 1,
        category_id: 1,
        name: "subcategory 1",
        slug: "subcategory-1",
    },
    {
        id: 2,
        category_id: 1,
        name: "subcategory 2",
        slug: "subcategory-2",
    },
    {
        id: 3,
        category_id: 1,
        name: "subcategory 3",
        slug: "subcategory-3",
    },
    {
        id: 4,
        category_id: 1,
        name: "subcategory 4",
        slug: "subcategory-4",
    },
]
// data for customers
export const customers = [
    {
        id: 1,
        name: "client 1",
        email: "client1@client.com",
        phone: "+591 60427039",
        address: "calle sucre, #45",
        ci: 35674567
    },
    {
        id: 2,
        name: "client 2",
        email: "client2@client.com",
        phone: "+591 60427039",
        address: "calle sucre, #45",
        ci: 35674567
    },
    {
        id: 3,
        name: "client 3",
        email: "client3@client.com",
        phone: "+591 60427039",
        address: "calle sucre, #45",
        ci: 35674567
    },
    {
        id: 4,
        name: "client 4",
        email: "client4@client.com",
        phone: "+591 60427039",
        address: "calle sucre, #45",
        ci: 35674567
    }
]

// data for suppliers
export const suppliers = [
    {
        id: 1,
        name: "juan perez",
        email: "juan@juan.com",
        phone: "+591 60427039",
        address: "calle sucre, #45",
        ci_nit: 35674567
    },
    {
        id: 2,
        name: "carlos perez",
        email: "carlos@carlos.com",
        phone: "+591 60427039",
        address: "calle sucre, #45",
        ci_nit: 35674567
    },
    {
        id: 3,
        name: "pedro perez",
        email: "pedro@pedro.com",
        phone: "+591 60427039",
        address: "calle sucre, #45",
        ci_nit: 35674567
    },
    {
        id: 4,
        name: "alicia perez",
        email: "alicia@alicia.com",
        phone: "+591 60427039",
        address: "calle sucre, #45",
        ci_nit: 35674567
    }
]
// data for products
export const products = [
    {
        id: 1,
        name: "product 1",
        slug: "product-1",
        price: 100,
        description: "product 1 description",
        image: "https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}"
    },
    {
        id: 2,
        name: "product 2",
        slug: "product-2",
        price: 100,
        description: "product 2 description",
        image: "https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}"
    },
    {
        id: 3,
        name: "product 3",
        slug: "product-3",
        price: 100,
        description: "product 3 description",
        image: "https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}"
    },
    {
        id: 4,
        name: "product 4",
        slug: "product-4",
        price: 100,
        description: "product 4 description",
        image: "https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}"
    },
    {
        id: 5,
        name: "product 5",
        slug: "product-5",
        price: 100,
        description: "product 5 description",
        image: "https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}"
    }
]
// data for inventory
export const inventories = [
    {
        id: 1,
        productId: 1,
        shopId: 1,
        supplierId: 1,
        stock: 100,
        restockDate: new Date(),
    },
    {
        id: 2,
        productId: 2,
        shopId: 2,
        supplierId: 2,
        stock: 100,
        restockDate: new Date(),
    },
    {
        id: 3,
        productId: 3,
        shopId: 3,
        supplierId: 3,
        stock: 100,
        restockDate: new Date(),
    },
    {
        id: 4,
        productId: 4,
        shopId: 4,
        supplierId: 4,
        stock: 100,
        restockDate: new Date(),
    }
]
// data for orders
export const orders = [
    {
        id: 1,
        customerId: 1,
        shopId: 1,
        quantity: 100,
        total: 100,
        status: "pending"
    },
    {
        id: 2,
        customerId: 2,
        shopId: 2,
        quantity: 100,
        total: 100,
        status: "pending"
    },
    {
        id: 3,
        customerId: 3,
        shopId: 3,
        quantity: 100,
        total: 100,
        status: "pending"
    },
    {
        id: 4,
        customerId: 4,
        shopId: 4,
        quantity: 100,
        total: 100,
        status: "pending"
    }
]


