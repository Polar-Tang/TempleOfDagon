import { Separator } from '@radix-ui/react-dropdown-menu'

const DescriptionProductSection = ({desc}: {desc: string | undefined}) => {
    return (
        <>
        <h1 className="text-2xl font-medium">Description</h1>
        <Separator className="my-4" />
        <p className='font-medium text-lg'>{desc ? desc : "This product has no description"}</p>
        <Separator className="my-4" />

        </>
    )
}

export default DescriptionProductSection