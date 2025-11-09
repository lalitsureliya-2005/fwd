const MENU_ITEMS = [
    { 
        id: '1', 
        name: 'Veg Biryani', 
        price: 95, 
        time: 15, 
        image: 'https://source.unsplash.com/400x300/?biryani', 
        category: 'Main',
        description: 'Fragrant basmati rice cooked with mixed vegetables and aromatic spices'
    },
    { 
        id: '2', 
        name: 'Paneer Roll', 
        price: 80, 
        time: 10, 
        image: 'https://source.unsplash.com/400x300/?sandwich', 
        category: 'Snacks',
        description: 'Fresh cottage cheese wrapped in a flaky paratha with mint chutney'
    },
    { 
        id: '3', 
        name: 'Masala Dosa', 
        price: 60, 
        time: 10, 
        image: 'https://source.unsplash.com/400x300/?dosa', 
        category: 'Breakfast',
        description: 'Crispy rice crepe served with spiced potato filling and chutneys'
    },
    { 
        id: '4', 
        name: 'Cold Coffee', 
        price: 50, 
        time: 5, 
        image: 'https://source.unsplash.com/400x300/?coffee', 
        category: 'Drinks',
        description: 'Creamy cold coffee topped with chocolate sauce'
    },
];

const router = require('express').Router();

// Get all menu items
router.get('/', (req, res) => {
    res.json({
        success: true,
        items: MENU_ITEMS
    });
});

// Get menu item by id
router.get('/:id', (req, res) => {
    const item = MENU_ITEMS.find(item => item.id === req.params.id);
    if (!item) {
        return res.status(404).json({
            success: false,
            message: 'Item not found'
        });
    }
    res.json({
        success: true,
        item
    });
});

module.exports = router;