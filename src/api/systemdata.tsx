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
    name: 'Tech Sol',
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