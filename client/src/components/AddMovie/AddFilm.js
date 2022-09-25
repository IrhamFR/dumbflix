import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Alert, Form } from "react-bootstrap";
import { useMutation } from 'react-query';
import { useNavigate } from "react-router-dom";
import { API } from '../../config/api';
import { styles } from './Styles';

const AddFilm = () => {

	const navigate = useNavigate();

	const getCategories = async () => {
		try {
		  const response = await API.get("/categories");
		  setCategories(response.data.data);
		} catch (error) {
		  console.log(error);
		}
	};

	const [categories, setCategories] = useState([]); //Store all category data
	// const [categoryId, setCategoryId] = useState([]);
	const [preview, setPreview] = useState(null); //For image preview

  	const [form, setForm] = useState({
		title: "",
		thumbnail: "",
		year: "",
		description: "",
		category_id: 0,
		titleEpisode: "",
		// thumbnailEpisode: "",
		linkfilm: "",
	});

	const [message, setMessage] = useState(null);

	// const [ rates, setRates ] = useState([
	// 	{ titleEpisode: '', thumbnailEpisode: '', linkfilm: '' }
	// ]);
	
	// const addRate = () => {
	// 	setRates([ ...rates, { titleEpisode: '', thumbnailEpisode: '', linkfilm: '' } ]);
	// };

	// const handleChange = (event) => {
	// 	const updateForm = [ ...rates ];
	// 	updateForm[event.target.dataset.id][event.target.className] = event.target.value;
	// 	setRates(updateForm);
	// };

	// const handleSubmit = (event) => {
	// 	event.preventDefault();
	// };

	const handleChange = (e) => {
		console.log("target", e.target.name);
		setForm({
		  ...form,
		  [e.target.name]:
			e.target.type === "file" ? e.target.files : e.target.value,
		});
	
		// Create image url for preview
		if (e.target.type === "file") {
		  let url = URL.createObjectURL(e.target.files[0]);
		  setPreview(url);
		}
	  };
	
	  const handleSubmit = useMutation(async (e) => {
		try {
		  e.preventDefault();

		  // Configuration Content-type
		  const config = {
			method: "POST",
			headers: {
			  "Content-type": "multipart/form-data",
			  Authorization: `Bearer ${localStorage.token}`,
			},
		  };
	
		  const formData = new FormData();
		  formData.set("title", form?.title);
		  formData.set("description", form?.description);
		  formData.set("year", form?.year);
		  formData.set("category_id", form?.category_id);
		  formData.set("linkfilm", form?.linkfilm);
		  formData.set(
			"thumbnail",
			form.thumbnail[0],
			form.thumbnail[0].name
		  );
		  formData.set("titleEpisode", form?.titleEpisode);
		//   formData.set(
		// 	"thumbnailEpisode",
		// 	form.thumbnailEpisode[0],
		// 	form.thumbnailEpisode[0].name
		//   );
	
		  console.log(form);
	
		  const response = await API.post("/film", formData, config);
		  console.log(response);
	
		  navigate("/list-film");
	
		  // Handling response here
		} catch (error) {
		  const alert = (
			<Alert variant="danger" className="py-1">
			  Failed
			</Alert>
		  );
		  setMessage(alert);
		  console.log(error);
		}
	  });
	
	  useEffect(() => {
		console.log(form);
		getCategories();
	}, [form.thumbnail]);

	return (
		<div>
			<form  onSubmit={(e) => { handleSubmit.mutate(e) }}>
				<div style={styles.container} className="mt-4 mb-4">
					<h4>Add Film</h4>
					<div className="form-group mb-2">
						<div 
							style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(2, 1fr)',	
							gridGap: '1rem'
							}}>
							
							<Form.Group>
								<Form.Control
								type="text"
								name= "title"
								id="title"
								className="title"
								placeholder="Title"
								style={styles.customInputTitle}
								onChange={handleChange} />
							</Form.Group>
							<Form.Group>
								<button 
								style={{
									width: '40%',
									height: '50px',
									fontSize: '15px',
									textAlign: 'left',
									float: 'right',
									justifySelf: 'right'
								}}>
									<input
									id="attachThumbnail"
									type="file"
									onChange={handleChange}
									name="thumbnail"
									/>
									<label for="attachThumbnail">
									Attach Thumbnail{' '}
										<span 
											style={{
												display: 'flex',
												float: 'right',
												display: 'inline',
												fontSize: '20px'
											}}>
											<FontAwesomeIcon icon={faPaperclip} />
										</span>
									</label>
								</button>
							</Form.Group>
						</div>	
					</div>
					<div className="form-group mb-4">
						<div>
							<div className="form-group mb-2">
									<input
										type="text"
										name="year"
										data-id=""
										id="year"
										className="year"
										placeholder="Year"
										style={styles.customInput}
										onChange={handleChange}
									/>
							</div>
							<div className="form-group mb-2">
								<select name="category_id" id="category_id" 
								style={styles.customInput} 
								onChange={handleChange}>
									<option disabled selected>
										Category
										</option>
									<option className="bg-dark" value="2">TV Series</option>
									<option className="bg-dark" value="1">Movies</option>
								</select>
							</div>
							<div className="form-group mb-0">
								<textarea 
								style={styles.textarea} 
								placeholder="Description" 
								id="description" 
								name="description" 
								rows="4" 
								cols="50" 
								onChange={handleChange}>
								</textarea>
							</div>
						</div>
					</div>	
					<div className="form-group mt-3">
							<div className="form-group mb-2">
								<div
									style={{
										display: 'grid',
										gridTemplateColumns: 'repeat(2, 1fr)',
										gridGap: '1rem'
									}}
								>
									<input
										type="text"
										name="titleEpisode"
										data-id=""
										id="titleEpisode"
										className="titleEpisode"
										placeholder="Title Episode"
										style={styles.customInputTitle}
										onChange={handleChange}
									/>
									<Form.Group>
										<span 
										style={{
											width: '40%',
											height: '50px',
											fontSize: '15px',
											textAlign: 'left',
											float: 'right',
											justifySelf: 'right'
										}}>
											{/* <input
											id="attachThumbnail"
											type="file"
											onChange={handleChange}
											name="thumbnailEpisode"
											/> */}
											<label for="attachThumbnail">
											Attach Thumbnail{' '}
												<span 
													style={{
														display: 'flex',
														float: 'right',
														display: 'inline',
														fontSize: '20px'
													}}>
													<FontAwesomeIcon icon={faPaperclip} />
												</span>
											</label>
										</span>
									</Form.Group>
								</div>
							</div>
							<div className="form-group">
								<input
									type="text"
									name="linkfilm"
									data-id=""
									id="linkfilm"
									className="linkfilm"
									placeholder="Link Film"
									style={styles.customInput}
									onChange={handleChange}
								/>
							</div>
						</div>	
					</div>

				{/* {rates.map((row, index) => {
					// const titleEpisode = `title-${index}`,
					// 	attachThumbnailEpisode = `attach-${index}`,
					// 	linkFilm = `link-${index}`;
					return (
						<div key={index} style={styles.container} className="mt-3" onSubmit={(e) => { handleSubmit.mutate(e) }}>
							<div className="form-group mb-2">
								<div
									style={{
										display: 'grid',
										gridTemplateColumns: 'repeat(2, 1fr)',
										gridGap: '1rem'
									}}
								>
									<input
										type="text"
										name="titleEpisode"
										data-id={index}
										id="titleEpisode"
										className="titleEpisode"
										placeholder="Title Episode"
										style={styles.customInputTitle}
										onChange={handleChange}
									/>
									<input
										type="file"
										name="thumbnailEpisode"
										data-id={index}
										id="thumbnailEpisode"
										className="thumbnailEpisode"
										style={styles.customInputFile}
										onChange={handleChange}
									/>
									<button
										className="btn-grey"	
										onClick={() => {
											document
											.getElementsByName("thumbnailEpisode")[0]
											.click();
										}}
										style={{
											width: '40%',
											height: '50px',
											fontSize: '15px',
											textAlign: 'left',
											float: 'right',
											justifySelf: 'right'
										}}
									>
										Attach Thumbnail{' '}
										<div
											style={{
												float: 'right',
												display: 'inline',
												fontSize: '20px'
											}}
										>
											<FontAwesomeIcon icon={faPaperclip} />
										</div>
									</button>
								</div>
							</div>
							<div className="form-group mb-2">
								<input
									type="text"
									name="linkfilm"
									data-id={index}
									id="linkfilm"
									className="linkfilm"
									placeholder="Link Film"
									style={styles.customInput}
									onChange={handleChange}
								/>
							</div>
						</div>	
					);
				})} */}
				<div className="form-group mb-3" style={styles.container}>
					<button
						className="btn-grey"
						style={{
							width: '100%',
							height: '50px',
							color: '#e50914',
							backgroundColor: 'rgba(210, 210, 210, 0.25)',
							border: "2px solid #d2d2d2"
						}}
						// onClick={addRate}
					>
					<FontAwesomeIcon icon={faPlus} />
					</button>
				</div>
				<div className='d-flex form-group mb-4 flex-row-reverse' style={styles.buttone}>
					<Button className="btn bg-danger text-white border-0 btn-regis px-5" type="submit">Save</Button>
				</div>
			</form>
		</div>
	);
};

export default AddFilm;