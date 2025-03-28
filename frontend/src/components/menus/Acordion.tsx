import {
    Accordion,
    // AccordionContent,
    AccordionItem,
    // AccordionTrigger,
  } from "@/components/ui/accordion"
  import { FaCircleUser, FaStore } from "react-icons/fa6";

  import { RiLogoutCircleRFill } from "react-icons/ri";
import { Link } from "react-router-dom";

  export function AccordionDemo() {
    return (
      <Accordion type="single" collapsible className="w-full z-400">
        {/* <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It's animated by default, but you can disable it if you prefer.
          </AccordionContent>
        </AccordionItem> */}
        <AccordionItem className="w-full flex py-[0.6em] px-[1.2em] items-center space-x-4" value="item-4">  
          <FaStore className="px-[1.2] py-[0.6]"/>
          <Link to={"/tienda"} className="text-black hover:underline"> 
          Tienda
          </Link> 
        </AccordionItem>
        <AccordionItem className="w-full flex text-start py-[0.6em] px-[1.2em] items-center space-x-4" value="item-4">          
          <FaCircleUser className="px-[1.2] py-[0.6] text-[1em] text-black "/>
            <Link to={"/login"} className="text-black hover:underline"> 
            Login
            </Link>
        </AccordionItem>
        <AccordionItem className="w-full flex py-[0.6em] px-[1.2em] items-center space-x-4" value="item-4">  
          <RiLogoutCircleRFill className="px-[1.2] py-[0.6]"/>
          <Link to={"/logout"} className="text-black hover:underline"> 
          Desconectarse
          </Link> 
        </AccordionItem>
      </Accordion>
    )
  }
  