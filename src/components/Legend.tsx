import Image from "next/image";
function Legend() {
	return (
		<div className="legend">
			<Image src="/legend_nobg.png" alt="Legend" className="legend-img" />
		</div>
	);
}

export default Legend;
