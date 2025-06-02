import mongoose from "mongoose";
import ENVIRONMENT from "../../config/environment"

export const products = [{
    image_url: `${process.env.FRONTENDURL}/images/products/bronce_cell.png`,
    comments: [],
    _id: "6828064fdb9bd4671fd1127e",
    stock: 50,
    price: 200,
    description: "This hard metal cell can hang living or dead beings beyond the human compresion, intact and not posible to break down or destroy. It's suitable for alchemist experiments and hold horrible invocations.",
    category: "metal",
    seller_name: "Charles Dexter Ward",
    title: 'Metal Cell',
    active: true
  },
  {
    _id: "6812424f01fbd13fcf8f1c0d",
    image_url: `${process.env.FRONTENDURL}/images/products/liber_damnatus.png`,
    comments: [],
    stock: 11,
    price: 1000,
    description: "This powerful book contains different recipes, and formulas for invocations, and other powerful spells. This may be used to summon demons, or summon the dead. It's a powerful book, and it's a must have for any alchemist.",
    category: "Magic",
    seller_name: "Charles Dexter Ward",
    title: 'Liber Damnatus',
    active: true
  },
  {
    _id: "6812424f01fbd13fcf8f1c0e",
    image_url: `${process.env.FRONTENDURL}/images/products/black_galley_bottle.png`,
    comments: [],
    stock: 70,
    price: 50,
    description: "With black galley wine the only thing you will see is darkness, after that anything can happen to you.",
    category: "Magic",
    seller_name: "Swami Chandraputra",
    title: 'Moon Wine',
    active: true
  },
  {
    _id: "6812424f01fbd13fcf8f1c0f",
    image_url: `${process.env.FRONTENDURL}/images/products/ngranek_statue.png`,
    comments: [],
    stock: 25,
    price: 70,
    description: "The art of image making is to carve lava into fabolous sculptures. This zebra made of solid lava is precious sample of the Ngranek's lava gathered and image maked from the Ngranek's lava.",
    category: "art",
    seller_name: "Swami Chandraputra",
    title: 'Ngranek Zebra Statue',
    active: true
  },
  {
    _id: "6812424f01fbd13fcf8f1c10",
    image_url: `${process.env.FRONTENDURL}/images/products/inquanok_ship.png`,
    comments: [],
    stock: 5,
    price: 10000,
    description: "A ship from the frozen lands of Inquanok, north of the dreamlands. Suitable for transporting tons of onyx, it withstands extreme cold, high preassure, and excessive weight.",
    category: "others",
    seller_name: "Swami Chandraputra",
    title: 'Inquanox Ship',
    active: true
  },
  
  {
    _id: "6812424f01fbd13fcf8f1c11",

    image_url: `${process.env.FRONTENDURL}/images/products/resuscitating_serum.png`,
    comments: [],
    stock: 90,
    price: 200,
    description: "This resuscitating serum will make anyone get up right after death, especially if the death occurred recently.",
    category: "others",
    seller_name: "Herbert West",
    title: 'Resuscitating Serum',
    active: true
  },
  {
    _id: "6812424f01fbd13fcf8f1c12",
    image_url: `${process.env.FRONTENDURL}/images/products/incinerator.png`,
    comments: [],
    stock: 20,
    price: 100,
    description: "This incinerator willturn into ashes anything without leaving a trace. it's 10 feet wide and 4 feet long",
    category: "others",
    seller_name: "Herbert West",
    title: 'Incinerator',
    active: true
  },
  {
    image_url: `${process.env.FRONTENDURL}/images/products/godfish.png`,
    comments: [],
    _id: "6828064fdb9bd4671fd1127b",
    price: 100,
    stock: 5,
    description: "rather for worshiping or simply decoration, everyone will need one as the sea rises to reclaim this doomed world...",
    category: "stone",
    seller_name: "Order of Dagon",
    title: 'Godfish Idol',
    active: true
  },
  {
    image_url: `${process.env.FRONTENDURL}/images/products/submarine_obelisk.png`,
    comments: [],
    _id: "6828064fdb9bd4671fd11281",
    stock: 30,
    price: 1000,
    description: "A cyclopean monolith that measures meters, perfect for decorating a garden and bringing strange events into your miserable life.",
    category: "Magic",
    seller_name: "Order of Dagon",
    title: 'Submarine Obelisk',
    active: true
  },
  {
    image_url: `${process.env.FRONTENDURL}/images/products/insmouth_fish.png`,
    comments: [],
    _id: "6828064fdb9bd4671fd1127c",
    stock: 500,
    price: 2,
    description: "'Ough, What do smell like?' Just like the best Massachusetts fresh fish, fish from Innsmouth, 2 dollars per unity",
    category: "meat",
    seller_name: "Order of Dagon",
    title: 'Innsmouth Fish',
    active: true
  },
  
  {
    title: 'Ticket to Innsmouth',
    price: 30,
    stock: 90,
    description: 'Ticket to Innsmouth',
    category: 'other',
    seller_name: 'Order of Dagon',
    image_url: `${process.env.FRONTENDURL}/images/products/ticket_insmouth.png`,
    comments: [],
    createdAt: '2025-04-03T01:43:17.077Z',
    updatedAt: '2025-04-03T01:43:17.077Z',
    active: false
  },
  {
    image_url: `${process.env.FRONTENDURL}/images/products/portrait_insmouth.png`,
    comments: [],
    stock: 75,
    price: 100,
    description: "The scotish painter Cosmo Alexander is offering a portrait of you, the price may be lower for Innsmouth citizens.",
    category: "art",
    seller_name: "Order of Dagon",
    title: 'Elegants Portraits',
    active: true
  },
];
