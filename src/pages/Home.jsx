import { useDispatch, useSelector } from "react-redux";
import DetailForm from "../components/DetailForm";
import HeaderForm from "../components/HeaderForm";
import { validateHeader } from "../components/HeaderForm";
import { validateDetails } from "../components/DetailForm";
import axios from "axios";
const Home = () => {
  const dispatch = useDispatch();
  const header = useSelector((state) => state.header)
  const detail = useSelector((state) => state.detail)
  //for clear form
  const handleclear = () => {
    dispatch({ type: 'RESET_FORM' });

  }

  //for printing all details of the page 

  const handleprint = () => {     //
    window.print();

  }

  //FOR INSERTING NEW ROW
  const handleinsert = () => {
    dispatch({ type: 'ADD_DETAIL_ROW' })
  }

  // submission/save/post all details to db

  const handleSubmit = async () => {
    if (!validateHeader(header)) return;
    if (!validateDetails(detail)) return;

    const detailWithSrNo = detail.map((row, index) => ({
      ...row,
      sr_no: index + 1,
      vr_no: header.vr_no,
    }));


    const payload = {
      header_table: header,
      detail_table: detailWithSrNo,
    };

    try {
      const res = await axios.post("http://5.189.180.8:8010/header/multiple", payload);
      alert("Form submitted successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to submit form. See console for details.");
    }
  };

  return (
    <div className=" flex p-4 justify-between items-start">
      <div className="w-full">
        <HeaderForm />
        <DetailForm />
      </div>
      <div className="flex flex-col space-y-4 justify-center mt-20">
        <button className="btn bg-blue-500 text-white px-4 py-2 rounded" onClick={handleclear}>new</button>
        <button className="btn bg-yellow-500 text-white px-4 py-2 rounded ml-2" onClick={handleinsert}>insert</button>
        <button className="btn bg-green-500 text-white px-4 py-2 rounded ml-2 " onClick={handleSubmit}>Save</button>
        <button className="btn bg-red-500 text-white px-4 py-2 rounded ml-2" onClick={handleprint}>print</button>
      </div>
    </div>
  );
}
export default Home;