import React from 'react'
import './sidebar.css'
import * as Icon from 'react-bootstrap-icons'

function Sidebar(props) {
  const page = props.page
  return (
    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block sidebar collapse">
    <div className="align-items-center">
    <a className="navbar-brand mr-0" href="/">
      <img src="../img/twe_logo.png" alt="The Weekly Edge Logo" />
    </a>
    </div>
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className={page ? "nav-link" : "nav-link active"} href="/dashboard">
              <span className={page ? "feather":  "feather active"}><Icon.House /> </span>
                  Home
            </a>
          </li>
          <li className="nav-item">
            <a className={page === "extras" ? "nav-link active" : "nav-link"} href="/dashboard/extras">
             <span className="feather"><Icon.Tools /> </span> 
                  Extras
                </a>
          </li>
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Articles</span>
          </h6>
          <li className="nav-item">
            <a className={page === "new article" ? "nav-link active" : "nav-link"} href="/dashboard/new article">
              <span className="feather"> <Icon.JournalPlus /> </span>
                  New Article
                </a>
          </li>
          <li className="nav-item">
            <a className={page === "your articles" ? "nav-link active" : "nav-link"} href="/dashboard/your articles">
              <span className="feather"><Icon.JournalBookmarkFill /> </span>
                  Your Articles
                </a>
          </li>
          <li className="nav-item">
            <a className={page === "all articles" ? "nav-link active" : "nav-link"} href="/dashboard/all articles">
              <span className="feather"><Icon.Journals /> </span>
                  All Articles
                </a>
          </li>
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Edition</span>
          </h6>
          {props.valid === "admin" &&
          <li className="nav-item">
            <a className={page === "create edition" ? "nav-link active" : "nav-link"} href="/dashboard/create edition">
              <span className="feather"> <Icon.FileRichtext /> </span>
                  Create Edition
                </a>
          </li>
          }
          <li className="nav-item">
            <a className={page === "previous editions" ? "nav-link active" : "nav-link"} href="/dashboard/previous editions">
              <span className="feather"> <Icon.Files /> </span>
                  Previous Editions
                </a>
          </li>
          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
            <span>Additional</span>
          </h6>
          <li className="nav-item">
            <a className={page === "signout" ? "nav-link active" : "nav-link"} href="/dashboard/signout">
              <span className="feather"> <Icon.Lock /> </span>
                 Sign out
                </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Sidebar;