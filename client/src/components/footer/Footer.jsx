import { Link } from "react-router-dom";
import "./Footer.scss";

function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="siteFooter">
			<div className="footerMain">
				<div className="brandBlock">
					<h3>Mi Dulce Hogar</h3>
					<p>
						Ayudamos a las familias a encontrar su hogar con confianza,
						claridad y experiencia local.
					</p>
					<span className="statusChip">Anuncios confiables en tu ciudad</span>
				</div>

				<div className="linkColumn">
					<h4>Explorar</h4>
					<Link to="/">Inicio</Link>
					<Link to="/list">Propiedades</Link>
					<Link to="/register">Crear cuenta</Link>
				</div>

				<div className="linkColumn">
					<h4>Cuenta</h4>
					<Link to="/login">Iniciar sesión</Link>
					<Link to="/profile">Mi perfil</Link>
					<Link to="/add">Publicar propiedad</Link>
				</div>
			</div>

			<div className="footerBottom">
				<span>&copy; {currentYear} Mi Dulce Hogar</span>
				<span>Diseñado para simplificar tu búsqueda de hogar.</span>
			</div>
		</footer>
	);
}

export default Footer;

