import React, { forwardRef } from 'react'
import './NewCollections.css'
import Item from '../Item/Item'

const NewCollections = forwardRef((props, ref)  => {
  return (
    <div className='new-collections' ref ={ref}>
      <h1>New Places: Your Next Dream Destinations</h1>
     
      <div className="collections">
        {props.data.map((item,index)=>{
                return <Item id={item.id} key={index} name={item.name} image={item.image}  new_price={item.new_price} old_price={item.old_price}/>
            })}
      </div>
    </div>
  )
})

export default NewCollections
