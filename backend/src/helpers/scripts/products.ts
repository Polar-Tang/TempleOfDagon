import mongoose from "mongoose";
import ENVIRONMENT from "../../config/environment"

export const products = [
  {
    image_url: `${process.env.FRONTENDURL}/godfish.png`,
    comments: [],
    _id: "6828064fdb9bd4671fd1127b",
    price: 100,
    stock: 5,
    description: "rather for worshiping or simply decoration, everyone will need one as the sea rises to reclaim this doomed world...",
    category: "stone",
    seller_name: "1",
    title: 'godfish idol',
    active: true
  },
  {
    image_url: `${process.env.FRONTENDURL}/insmouth_fish.png`,
    comments: [],
    _id: "6828064fdb9bd4671fd1127c",
    stock: 500,
    price: 2,
    description: "'Ough, What do smell like?' Just like the best Massachusetts fresh fish, fish from Insmouth, 2 dollars per unity",
    category: "insmouth fish",
    seller_name: "2",
    title: 'insmouth fish',
    active: true
  },
  {
    image_url: `${process.env.FRONTENDURL}/submarine_obelisk.png`,
    comments: [],
    _id: "6828064fdb9bd4671fd11281",

    stock: 30,
    price: 1000,
    description: "A cyclopean monolith that measures meters, perfect for decorating a garden and bringing strange events into your miserable life.",
    category: "Submarine Obelisk",
    seller_name: "3",
    title: 'image 3',
    active: true
  },
  {
    image_url: `${process.env.FRONTENDURL}/bronce_cell.png`,
    comments: [],
    _id: "6828064fdb9bd4671fd1127e",
    stock: 100,
    price: 80,
    description: "Lost civilizations older than Earth, rites for communing with the blind idiot god Azathoth, and the geometry of forgotten stars under which dread Cthulhu dreams. The Necronomicon is no mere book—it is an invitation to annihilation.",
    category: "Magic",
    seller_name: "Abdul Alhazred, the Mad Arab",
    title: 'Necronomicon (Order of Dagon edition)',
    active: true
  },
  {
    _id: "6812424f01fbd13fcf8f1c0d",
    image_url: `${process.env.FRONTENDURL}/liber_damnatus.png`,
    comments: [],
    stock: 11,
    price: 1189,
    description: "Spores, and spores, and spores...",
    category: "Magic",
    seller_name: "Charles Dexter Ward",
    title: 'image 5',
    active: true
  },
  {
    _id: "6812424f01fbd13fcf8f1c0e",
    image_url: 'https://images.unsplash.com/photo-1700770845346-7e95de335eb0?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    comments: [],
    stock: 70,
    price: 40,
    description: "Spores, and spores, and spores...",
    category: "Magic",
    seller_name: "Charles Dexter Ward",
    title: 'image 6',
    active: true
  },
  {
    _id: "6812424f01fbd13fcf8f1c0f",

    image_url: 'https://images.unsplash.com/photo-1700751639138-e6628c42b558?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    comments: [],
    stock: 25,
    price: 70,
    description: "Spores, and spores, and spores...",
    category: "Magic",
    seller_name: "7",
    title: 'image 7',
    active: true
  },
  {
    _id: "6812424f01fbd13fcf8f1c10",
    image_url: 'https://plus.unsplash.com/premium_photo-1698442704192-086265cf630e?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    comments: [],
    stock: 25,
    price: 100,
    description: "Spores, and spores, and spores...",
    category: "Magic",
    seller_name: "8",
    title: 'image 8',
    active: true
  },
  {
    _id: "6812424f01fbd13fcf8f1c11",
    image_url: 'https://images.unsplash.com/photo-1700753227268-8832c285591e?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    comments: [],
    stock: 75,
    price: 10,
    description: "Spores, and spores, and spores...",
    category: "Magic",
    seller_name: "9",
    title: 'image 9',
    active: true
  },
  {
    _id: "6812424f01fbd13fcf8f1c12",
    image_url: 'https://images.unsplash.com/photo-1700769025506-6c3dcb9ec9b7?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    comments: [],
    stock: 90,
    price: 10,
    description: "Spores, and spores, and spores...",
    category: "Magic",
    seller_name: "10",
    title: 'image 10',
    active: true
  },
  {
    title: 'image 11',
    price: 10,
    stock: 90,
    description: 'Ticket',
    category: 'magic',
    seller_name: '11',
    image_url: 'https://images.unsplash.com/photo-1700769025506-6c3dcb9ec9b7?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    comments: [],
    createdAt: '2025-04-03T01:43:17.077Z',
    updatedAt: '2025-04-03T01:43:17.077Z',
    active: false
  }
];
