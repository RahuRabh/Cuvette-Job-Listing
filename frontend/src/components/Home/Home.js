import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllJobPost } from "../../apis/job";
import { DEFAULT_SKILLS } from "../../utils/constants";
import styles from "./Home.module.css";

export default function Home() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [skills, setSkills] = useState([]);
    const [title, setTitle] = useState("");
    const [token] = useState(localStorage.getItem("token"));

    const fetchAllJobs = async () => {
        const filterSkills = skills.join(",");
        const response = await getAllJobPost({ skills: filterSkills, title });
        setJobs(response.data);
    };

    useEffect(() => {
        fetchAllJobs();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const handleLogin = () => {
        navigate("/login");
    };

    const handleSkill = (event) => {
        const newArr = skills.filter((skill) => skill === event.target.value);
        if (!newArr.length) {
            setSkills([...skills, event.target.value]);
        }
    };

    const removeSkill = (selectedSkill) => {
        const newArr = skills.filter((skill) => skill !== selectedSkill);
        setSkills([...newArr]);
    };

    return (
        <>
            <h1 className={styles.title}>Job Finder, Your Job is Waiting!</h1>
            <div className={styles.container}>
                {token ? <button className={styles.logout} onClick={handleLogout}>Logout</button> : <button className={styles.logout} onClick={handleLogin}>Login</button>}
                <div className={styles.containerTop}>
                    <input
                        className={styles.inputTop}
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        type="text"
                        name="search"
                        placeholder="Type job title/skills"
                    />
                </div>
                <div className={styles.containerBottom}>
                    <select
                        onChange={handleSkill}
                        className={styles.inputSelect}
                        name="remote"
                    >
                        <option value="">Skills</option>
                        {DEFAULT_SKILLS.map((skill) => (
                            <option key={skill} value={skill}>
                                {skill}
                            </option>
                        ))}
                    </select>
                    {skills.map((skill) => {
                        return (
                            <span className={styles.chip} key={skill}>
                                {skill}
                                <span
                                    onClick={() => removeSkill(skill)}
                                    className={styles.cross}
                                >
                                    X
                                </span>
                            </span>
                        );
                    })}
                    <button
                        onClick={() => {
                            setSkills([]);
                            setTitle("");
                        }}
                        className={styles.edit}
                    >
                        Clear
                    </button>
                    <button onClick={fetchAllJobs} className={styles.edit}>
                        Apply Filter
                    </button>
                    <button
                        onClick={() => navigate("/job-post")}
                        className={styles.edit}
                    >
                        Add Job
                    </button>
                </div>
            </div>
            {jobs.map((data) => {
                return (
                    <div key={data._id} className={styles.list}>
                        <div className={styles.listLeft}>
                            <div>
                                <img src={data.logoURL} />
                            </div>
                            <div className={styles.infoLeft}>
                                <p className={styles.position}>
                                    {data.position}
                                </p>
                                <p className={styles.extraInfo}>
                                    <span className={styles.greyText}>
                                        {data.companyName}
                                    </span>
                                    <span className={styles.greyText}>
                                        {data.title}
                                    </span>
                                </p>
                                <p className={styles.extraInfo}>
                                    <span className={styles.greyText}>
                                        {data.salary}
                                    </span>
                                    <span className={styles.greyText}>
                                        {data.description}
                                    </span>
                                    <br />
                                    <button
                                        onClick={() =>
                                            navigate(`/job-details/${data._id}`)
                                        }
                                        className={styles.view}
                                    >
                                        View Details
                                    </button>
                                </p>
                            </div>
                        </div>
                        <div>
                            <div>
                                {data?.skills?.map((skill) => {
                                    return (
                                        <span
                                            className={styles.skill}
                                            key={skill}
                                        >
                                            {skill}
                                        </span>
                                    );
                                })}
                            </div>
                            <div className={styles.btnGroup}>
                            </div>
                        </div>
                    </div>
                );
            })}
            {/* </div> */}
        </>
    );
}