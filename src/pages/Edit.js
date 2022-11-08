import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
    const navigate = useNavigate();
    
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams.get("id"));

    return (
        <div>
            <h1>Edit</h1>
            <p>이곳은 수정페이지</p>
        </div>
    );
}

export default Edit;