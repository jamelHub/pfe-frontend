
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';


const Card = ({name}) => {

    return (<div className="w-full flex h-16   border-collapse bg-gray-100 border-gray-400 border-1 hover:shadow-xl  hover:bg-gray-200 justify-between">
        <div className='p-4'>
            <h1> {name} </h1>
        </div>

        <div className="flex gap-4 p-4">
            <div >
                <IconButton color="primary" aria-label="add to shopping cart">
                    <EditIcon />
                </IconButton>
            </div>
            <div>

                <IconButton color="primary" aria-label="add to shopping cart" >
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>

    </div>)
}
export default Card;