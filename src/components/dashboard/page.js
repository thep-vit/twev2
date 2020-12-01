import React from 'react'
import _ from 'lodash'
import "./page.css"
import Dash from '../pages/dashboard'
import Extras from '../pages/extras'
import AllArticles from '../pages/all-articles'
import CreateEdition from '../pages/create-edition'
import NewArticle from '../pages/new-article'
import OldEditions from '../pages/old-editions'
import YourArticle from '../pages/your-article'
import Signout from '../pages/signout'

function Page(props) {
  const page = props.page

  return (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4 mb-5 mt-3">
      <div className="border-bottom mb-3 ">
        <h3 className="page-title">{props.page ? _.capitalize(page) : "Home"}</h3>
      </div>
      <div>
        {page === undefined && <Dash />}
        {page === "extras" && <Extras />}
        {page === "all articles" && <AllArticles valid={props.valid} />}
        {page === "create edition" && <CreateEdition />}
        {page === "new article" && <NewArticle />}
        {page === "previous editions" && <OldEditions />}
        {page === "your articles" && <YourArticle valid={props.valid} />}
        {page === "signout" && <Signout />}
      </div>
    </main>
  )
}

export default Page;