import { useGetFounditemByUserQuery } from "../../Api/founditem";

function UserFoundItemById() {
    const { data } = useGetFounditemByUserQuery();
    console.log("bvcfdxcfvgbhjnkmjnbhgv",data);
    

  return (
    <div>
      
    </div>
  )
}

export default UserFoundItemById
