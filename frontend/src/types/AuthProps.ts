export type LinkDirection = {
	to: string
	label: string
  }
  
  export type FieldDataProps = {
	field_tag: string,
	type: string,
	name: "password" | "email" | "name",
	id: string,
	placeholder: string,
	className: string
  }
  
  export type AuthTypeProps = {
	titleH1: string
	cardDescription: string
	linkDirections?: LinkDirection[]
	field_data_props: FieldDataProps[]
	submit_bottom_text: string
	endpoint?: string,
	endpointInSuccessCase?: string,

  }