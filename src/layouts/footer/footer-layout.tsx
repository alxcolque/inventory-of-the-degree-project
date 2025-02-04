import { Link, Spacer, Image, Tooltip, Button, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
//import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaTelegramPlane } from "react-icons/fa";
import { useSettingStore } from "../../stores";
//import { FaPinterest, FaReddit, FaSnapchat, FaWhatsapp, FaYoutube } from "react-icons/fa6";
//import { RiTiktokLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export const FooterLayout = () => {
  const company = useSettingStore(state => state.systemData);
  const { logo, name, description, support, contact, social } = company as any;

  const getSystemData = useSettingStore(state => state.getSystemData);
  const [isLoading, setIsLoading] = useState(false);
  //const [contact, setContact] = useState<string[]>([]);
  //const [social, setSocial] = useState<string[]>([]);
  const navigate = useNavigate();

  /* const socialIcons = [
    { icon: FaFacebookF, name: 'facebook', color: '#1877F2' },
    { icon: FaTwitter, name: 'twitter', color: '#1DA1F2' },
    { icon: FaInstagram, name: 'instagram', color: '#E4405F' },
    { icon: FaLinkedinIn, name: 'linkedin', color: '#0077B5' },
    { icon: FaWhatsapp, name: 'whatsapp', color: '#25D366' },
    { icon: FaYoutube, name: 'youtube', color: '#FF0000' },
    { icon: RiTiktokLine, name: 'tiktok', color: '#504f4f' },
    { icon: FaPinterest, name: 'pinterest', color: '#E60000' },
    { icon: FaReddit, name: 'reddit', color: '#FF4500' },
    { icon: FaSnapchat, name: 'snapchat', color: '#FFFC00' },
    { icon: FaTelegramPlane, name: 'telegram', color: '#0088CC' },
  ]; */
  
  const handleGetSystemData = async () => {
    try {
      setIsLoading(true);
      await getSystemData();
      setIsLoading(false);
    } catch (error) {
      console.error('Error al obtener los datos del sistema:', error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleGetSystemData();
    
  }, []);

  const currentSocial: any[] = [];
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <Spinner />
    </div>
  }
  if (social) {
    /* social?.forEach(item => {
      const domain = new URL(item).hostname.split('.').slice(0, -1).join('.');
      const icon = socialIcons.find(icon => icon.name === domain);

      if (icon) {
        currentSocial.push({ ...icon, socialLink: item.replace(/\\/g, '') });
      }
    }); */
  }
  //console.log(company?.contact);
  return (
    <footer className="bg-background/90 py-10 mt-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 justify-center">
          {/* Logo e información */}
          <div className="col-span-1">
            <div className="max-w-[300px] w-full flex items-center gap-3">
              <div>
                <Image
                  src={logo}
                  alt={name}
                  width={50} height={50}
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <h3 className="text-primary font-bold uppercase">
                  {name}
                </h3>
                <p className="text-foreground/70 text-sm">
                  {description}
                </p>

              </div>
            </div>



          </div>

          {/* Enlaces rápidos */}
          <div className="col-span-1 flex flex-col gap-2 items-center">
            <Link onPress={() => navigate('/terminos')} className="text-primary/70 font-bold" >Términos y condiciones</Link>
            <Link onPress={() => navigate('/privacidad')} className="text-primary/70 font-bold" >Política de privacidad</Link>
            <p className="text-red-500 text-sm">
              {support}
            </p>
          </div>

          {/* Información de Contacto */}
          <div className="col-span-1">
            <h4 className="text-foreground/90 font-bold uppercase">Contacto</h4>
            <Spacer y={0.5} />
            {/* {contact?.map((item, index) => (
              <p key={index} className="text-foreground/70">{item}</p>
            ))} */}

            <p className="text-foreground/70">{contact}</p>
          </div>
        </div>

        <hr className="my-2" />

        {/* Redes Sociales */}
        {currentSocial.length > 0 && (
          <div className="flex justify-center">
            {currentSocial.map((icon, index) => (
              <Link key={index} href={icon.socialLink} target="_blank" className="mx-2">
                <Tooltip key={index} style={{ color: icon.color }} content={icon.name}>
                  {/* Sombra del icono en la clase */}
                  <Button isIconOnly variant="bordered" className="shadow-sm">
                    <icon.icon size={20} className="text-foreground/70 hover:text-primary transition-colors" style={{ color: icon.color }} />
                  </Button>
                </Tooltip>
              </Link>
            ))}
          </div>
        )}

        {/* Copyright */}
        <div className="flex justify-center" style={{ marginTop: '20px' }}>
          <p className="text-foreground/50">
            &copy; {new Date().getFullYear()} <a href="https://culking.com" target="_blank" className="text-primary">{name}</a>. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
