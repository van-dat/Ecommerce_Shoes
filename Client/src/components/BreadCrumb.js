import React from 'react'
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from 'react-router-dom';
import icons from '../ultils/icon';
import { useLocation } from 'react-router-dom';
const {  BiHome } = icons
const BreadCrumb = ({ bg }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className={`flex items-center gap-1 p-2 w-full ${bg ? bg : 'bg-content'}`}>
      <Link to="/" className='flex items-center'><BiHome />Trang chủ</Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames?.length - 1;
        if(routeTo == '/giay-nike'){
          name = 'Giày Nike'
        }
        if(routeTo == '/giay-adidas'){
          name = 'Giày Adidas'
        }
        if(routeTo == '/giay-mlb'){
          name = 'Giày MLB'
        }
        if(routeTo == '/phu-kien'){
          name = 'Phụ kiện'
        }
        if(routeTo == '/nike'){
          name = 'Nike'
        }
        if(routeTo == '/adidas'){
          name = 'Adidas'
        }
        if(routeTo == '/mlb'){
          name = 'MLB'
        }
        if(routeTo == '/cart'){
          name = 'Giỏ hàng'
        }
        return (
          <div key={name} className={`flex items-center gap-1 ${isLast ? 'text-main-100' : ''}`}>
            /
            <Link to={routeTo}>{name}</Link>{''}

          </div>
        );
      })}
    </div>
  );
}

export default BreadCrumb
