import { useState, useEffect } from "react";
import ServiceBox from "../components/ServiceBox";
import "../components/css/ServiceBox.css";

const Service = (props) => {
	const [data, setData] = useState([
		{
			service: "",
			description: "",
			price: "",
			provider: "",
		},
	]);

	const URL = "http://127.0.0.1:5000/api/data/service";

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(URL, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});
				const res_data = await response.json();
				// console.log( res_data );
				setData(res_data);
			} catch (error) {
				console.error("Service data not found");
			}
		};
		fetchData();
	}, []);

	return (
		<div className="service-container">
			<h1>Our Services</h1>
			<div className="service-areas">
				{data.map((item, i) => (
					<ServiceBox
						key={i}
						service={data[i].service}
						description={data[i].description}
						price={data[i].price}
						provider={data[i].provider}
					/>
				))}
			</div>
		</div>
	);
};

export default Service;
