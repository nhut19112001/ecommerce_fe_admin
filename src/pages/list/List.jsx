import "./list.scss"
import Datatable from "../../components/datatable/Datatable"

const List = ({columns}) => {
  return (
    <div className="list">
      <div className="listContainer">
        <Datatable columns={columns}/>
      </div>
    </div>
  )
}

export default List