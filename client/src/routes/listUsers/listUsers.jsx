import { Suspense, useContext } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import UserCard from "../../components/UserCard/userCard"
import { listUserLoader } from "../../lib/loaders";


function ListUsers(){
    const {currentUser}= useContext(AuthContext);
    const users = useLoaderData();
    console.log(users)
    return(
        <Suspense fallback={<p>Cargando...</p>}>
            <Await
            resolve={users.usersResponse}
            errorElement={<p>Error cargando usuarios!</p>}
            >
            
                 
                 {(usersResponse) => <UserCard item={usersResponse.data}/>}
           
        </Await>
        </Suspense>
        
    )
}
export default ListUsers;