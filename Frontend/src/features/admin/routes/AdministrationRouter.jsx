import { Navigate, Route, Routes } from "react-router-dom"
import { Footer, Nav } from "../../user/components"
import { DashboardPage } from "../pages/DashboardPage"
import { CategoriesListPage, CreateCategoriesPage, EditUserPage, EventListPage, ReportsListPage, UsersListPage } from "../pages"
import { EditCategoryPage } from "../pages/EditCategoryPage"
import { CreateUsersPage } from "../pages/CreateUsersPage"

export const AdministrationRouter = () => {
  return (
    <div className='overflow-x-hidden bg-gray-800 w-screen h-screen bg-hero-pattern bg-no-repeat bg-cover'>
      <Nav />
      <div className="px-10">
        <div className="min-h-screen flex flex-col ">
          <Routes>
            <Route path='/dashboard' element={<DashboardPage />} />
            <Route path='/users-list' element={<UsersListPage />} />
            <Route path='/user/edit/:id' element={<EditUserPage />} />
            <Route path='/users-list/new' element={<CreateUsersPage />} />
            <Route path='/events-list' element={<EventListPage />} />
            <Route path='/categories-list' element={<CategoriesListPage />} />
            <Route path='/categories-list/edit/:id' element={<EditCategoryPage />} />
            <Route path='/categories-list/new' element={<CreateCategoriesPage />} />
            <Route path='/reports-list' element={<ReportsListPage />} />
            <Route path='/*' element={<Navigate to={"/dashboard"} />} />
          </Routes>
        </div>
        </div>
      <Footer/>
    </div>
  )
}
