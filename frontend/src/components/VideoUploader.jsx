import { useState } from "react";

function VideoUploader() {

    const [video, setVideo] = useState(null);
    const [score, setScore] = useState(0);


    const upload = (e) => {

        let file = e.target.files[0];

        if (file)
            setVideo(URL.createObjectURL(file));

    };


    const analyze = () => {

        if (!video)
            return alert("Upload video first");

        setScore(85);

    };



    return (

        <div className="card">

            <h2>🎥 Video Trainer</h2>


            <input

                type="file"

                accept="video/*"

                onChange={upload}

            />



            {video &&

                <video

                    src={video}

                    controls

                    width="250"

                />

            }



            <button onClick={analyze}>
                Analyze
            </button>



            {score > 0 &&

                <h3>
                    AI Score: {score}/100
                </h3>

            }



        </div>

    )

}

export default VideoUploader;