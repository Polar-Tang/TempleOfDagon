import Product from '../../models/product.models.js'

const createProducts = async () => { 
    try {

        const products = [
            {
                image_url: 'https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                price: 300,
                stock: 5,
                description: "Spores, and spores, and spores...",
                category: "Magic",
                seller_id: "1",
                title: 'image 1',
                active: true    
              },
              {
                image_url: 'https://images.unsplash.com/photo-1682686581551-867e0b208bd1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                stock: 50,
                price: 460,
                description: "Spores, and spores, and spores...",
                category: "Magic",
                seller_id: "2",
                title: 'image 2',
                active: true
              },
              {
                image_url: 'https://images.unsplash.com/photo-1682695797221-8164ff1fafc9?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                stock: 30,
                price: 60,
                description: "Spores, and spores, and spores...",
                category: "Magic",
                seller_id: "3",
                title: 'image 3',
                active: true
              },
              {
                image_url: 'https://images.unsplash.com/photo-1700744228339-03c725f5ee57?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                stock: 100,
                price: 80,
                description: "Spores, and spores, and spores...",
                category: "Magic",
                seller_id: "4",
                title: 'image 4',
                active: true
              },
              {
                image_url: 'https://images.unsplash.com/photo-1700839154423-83ea2246621b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                stock: 40,
                price: 50,
                description: "Spores, and spores, and spores...",
                category: "Magic",
                seller_id: "5",
                title: 'image 5',
                active: true
              },
              {
                image_url: 'https://images.unsplash.com/photo-1700770845346-7e95de335eb0?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                stock: 70,
                price: 40,
                description: "Spores, and spores, and spores...",
                category: "Magic",
                seller_id: "6",
                title: 'image 6',
                active: true
              },
              {
                image_url: 'https://images.unsplash.com/photo-1700751639138-e6628c42b558?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                stock: 25,
                price: 70,
                description: "Spores, and spores, and spores...",
                category: "Magic",
                seller_id: "7",
                title: 'image 7',
                active: true
              },
              {
                image_url: 'https://plus.unsplash.com/premium_photo-1698442704192-086265cf630e?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                stock: 25,
                price: 100,
                description: "Spores, and spores, and spores...",
                category: "Magic",
                seller_id: "8",
                title: 'image 8',
                active: true
              },
              {
                image_url: 'https://images.unsplash.com/photo-1700753227268-8832c285591e?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                stock: 75,
                price: 10,
                description: "Spores, and spores, and spores...",
                category: "Magic",
                seller_id: "9",
                title: 'image 9',
                active: true
              },
              {
                image_url: 'https://images.unsplash.com/photo-1700769025506-6c3dcb9ec9b7?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                stock: 90,
                price: 10,
                description: "Spores, and spores, and spores...",
                category: "Magic",
                seller_id: "10",
                title: 'image 10',
                active: true
              },
        ];
        
        await Product.insertMany(products);
        console.log("Products seeded");
    } catch (err){
        console.log("An error when we were seed has happened: ",err)
    }
}

export default createProducts