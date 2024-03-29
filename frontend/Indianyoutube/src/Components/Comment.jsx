import React ,{useState,useEffect}from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentsonvideo, addcommentonvideo, getcommentbyid, noofcomments, deletecomment, updatecomment } from "../Redux/comment";
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
export default function CommentSection({ videodetail }) {
    const dispatch = useDispatch();
    const state = useSelector((state) => (state.auth))
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [textareaview, settextbox] = useState(false);
    const [usercom, setcommentbyuser] = useState([]);
    const [comment, setcomment] = useState([]);
    const [commenttext, setcommenttext] = useState("");
    const [contdata, setcontdata] = useState("");
    const [nocomment, setnocomment] = useState(0);
    const handleMouseEnter = (index) => {
        setHoveredIndex(index)
    }
    const handleMouseleave = () => {
        setHoveredIndex(null);
        settextbox(false);
    }
    async function commentscount() {
        const totalcomment = await dispatch(noofcomments(videodetail?._id));
        setnocomment(totalcomment?.payload?.data?.data[0]?.comment)
    }
    async function commentonvideo() {
        const commentdetail = await dispatch(commentsonvideo(videodetail?._id))
        setcomment(commentdetail?.payload?.data?.data)
    }
    async function commentsadd(e) {
        e.preventDefault();
        const addcommnet = { videoid: videodetail?._id, content: commenttext };
        const commentaddition = await dispatch(addcommentonvideo(addcommnet));
        setcommenttext(" ");
        console.log(commentaddition);
    }
    async function commentbyuser() {
        const usercomm = await dispatch(getcommentbyid({ videoid: videodetail?._id, userid: state.info._id }));
        console.log(usercomm);
        setcommentbyuser(usercomm?.payload?.data?.data)
    }
    async function updation(commentid) {
        const obj = { commentid: commentid, content: contdata }
        const resp = await dispatch(updatecomment(obj));
        console.log(resp);
        setcontdata("")
    }
    async function deletionofcomment(commentid) {
        const resp = await dispatch(deletecomment(commentid));
        console.log(resp);
    }
    useEffect(() => {
        commentonvideo();
        commentscount();
        commentbyuser();
    }, [])
    return (
        <>
            <div className="bg-black min-h-screen flex flex-col text-white">
                <h1 className="text-2xl font-bold mb-4">Total Comments: {nocomment}</h1>

                {/* Form to add comments */}
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-4">Comments</h2>
                    <form onSubmit={commentsadd}>
                        <textarea
                            className="w-full h-24 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 text-black"
                            placeholder="Add a public comment..."
                            value={commenttext}
                            onChange={(e) => (setcommenttext(e.target.value))}
                        />
                        <button
                            type="submit"
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            Comment
                        </button>
                    </form>
                </div>
                {/* Display comments by user */}
                <div>
                    {usercom?.map((cont, index) => (
                        <div key={index} onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={() => handleMouseleave()} className="relative bg-red-500 mt-4">
                            <h3 className="text-white bg-red-500">{cont?.content}</h3>
                            {hoveredIndex === index && (
                                <div className="absolute top-0 right-0 mt-2 mr-2 flex space-x-2">
                                    <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md flex items-center justify-center" onClick={() => (deletionofcomment(cont?._id))}>
                                        <FaTrash />
                                    </button>
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md flex items-center justify-center" onClick={() => (settextbox(!textareaview))}>
                                        <FaPencilAlt />
                                    </button>
                                    {textareaview && (
                                       <div className="flex flex-col space-y-2">
                                       <textarea
                                         className="border p-2 rounded text-black"
                                         value={contdata}
                                         onChange={(e) => setcontdata(e.target.value)}
                                       />
                                       <button
                                         className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                                         onClick={()=>(updation(cont?._id))}
                                       >
                                         Save
                                       </button>
                                     </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {comment?.map((content) => (
                    <div>
                        <h1>{content?.content}</h1>
                    </div>
                ))}
            </div>
        </>
    )
}