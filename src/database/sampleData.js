// Sample data for testing search and filtering functionality
// This file contains example listings that you can use to populate your database

const sampleListings = [
    {
        title: "Cozy Mountain Cabin",
        description: "A beautiful wooden cabin nestled in the mountains with stunning views and modern amenities. Perfect for a peaceful getaway.",
        location: "Manali, Himachal Pradesh",
        country: "India",
        category: "Mountains",
        price: 2500,
        image: {
            url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
            filename: "mountain-cabin.jpg"
        }
    },
    {
        title: "Luxury City Apartment",
        description: "Modern apartment in the heart of the city with all amenities. Close to shopping, restaurants, and public transport.",
        location: "Mumbai, Maharashtra",
        country: "India",
        category: "Iconic Cities",
        price: 3500,
        image: {
            url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
            filename: "city-apartment.jpg"
        }
    },
    {
        title: "Historic Castle Suite",
        description: "Experience royalty in this beautifully restored castle suite. Rich history meets modern luxury in this unique accommodation.",
        location: "Jaipur, Rajasthan",
        country: "India",
        category: "Castles",
        price: 8000,
        image: {
            url: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&h=600&fit=crop",
            filename: "castle-suite.jpg"
        }
    },
    {
        title: "Arctic Glass Dome",
        description: "Sleep under the northern lights in this stunning glass dome. Experience the magic of the Arctic in complete comfort.",
        location: "Rovaniemi, Lapland",
        country: "Finland",
        category: "Domes",
        price: 12000,
        image: {
            url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
            filename: "arctic-dome.jpg"
        }
    },
    {
        title: "Riverside Camping Site",
        description: "Peaceful camping site by the river with all necessary facilities. Perfect for nature lovers and adventure seekers.",
        location: "Rishikesh, Uttarakhand",
        country: "India",
        category: "Camping",
        price: 800,
        image: {
            url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop",
            filename: "camping-site.jpg"
        }
    },
    {
        title: "Luxury Houseboat",
        description: "Experience the backwaters of Kerala in this luxurious houseboat. Traditional design with modern amenities.",
        location: "Alleppey, Kerala",
        country: "India",
        category: "Boats",
        price: 4500,
        image: {
            url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
            filename: "houseboat.jpg"
        }
    },
    {
        title: "Organic Farm Stay",
        description: "Experience rural life on this organic farm. Fresh produce, farm animals, and peaceful countryside views.",
        location: "Coorg, Karnataka",
        country: "India",
        category: "Farms",
        price: 1500,
        image: {
            url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
            filename: "farm-stay.jpg"
        }
    },
    {
        title: "Arctic Ice Hotel",
        description: "Unique accommodation made entirely of ice and snow. Experience the extreme beauty of the Arctic winter.",
        location: "Kiruna, Sweden",
        country: "Sweden",
        category: "Arctic",
        price: 15000,
        image: {
            url: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&h=600&fit=crop",
            filename: "ice-hotel.jpg"
        }
    },
    {
        title: "Mountain View Resort",
        description: "Luxury resort with panoramic mountain views. Spa, restaurant, and adventure activities available.",
        location: "Shimla, Himachal Pradesh",
        country: "India",
        category: "Mountains",
        price: 5000,
        image: {
            url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
            filename: "mountain-resort.jpg"
        }
    },
    {
        title: "Trending Beach Villa",
        description: "Popular beachfront villa with private access to pristine beaches. Modern design with tropical vibes.",
        location: "Goa, India",
        country: "India",
        category: "Trending",
        price: 6000,
        image: {
            url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
            filename: "beach-villa.jpg"
        }
    },
    {
        title: "Cozy Studio Room",
        description: "Perfect for solo travelers or couples. Compact but comfortable with all essential amenities.",
        location: "Bangalore, Karnataka",
        country: "India",
        category: "Rooms",
        price: 1200,
        image: {
            url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
            filename: "studio-room.jpg"
        }
    },
    {
        title: "Arctic Hot Springs",
        description: "Natural hot springs in the Arctic wilderness. Relax in warm water while surrounded by snow and ice.",
        location: "Iceland",
        country: "Iceland",
        category: "Arctic Pools",
        price: 3000,
        image: {
            url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
            filename: "arctic-springs.jpg"
        }
    }
];

module.exports = sampleListings; 