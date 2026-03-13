import './list.scss'
import Card from"../card/Card"


function List({posts,prof}){
  
  return (
    <div className='list'>
      {posts.map(item=>(
        <Card prof={prof} key={item.id} item={item}/>
      ))}
    </div>
  )
}

export default List