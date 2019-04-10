import React from "react"
import ReactDOM from "react-dom"
import renderer from "react-test-renderer"
import { MemoryRouter } from "react-router"
import Sidebar, { SidebarItem } from "./Sidebar"
import { ResourceView } from "./HUD"
import { oneResourceView } from "./testdata.test"
import { mount } from "enzyme"

describe("sidebar", () => {
  it("renders empty resource list without crashing", () => {
    const tree = renderer
      .create(
        <MemoryRouter initialEntries={["/"]}>
          <Sidebar
            isClosed={true}
            items={[]}
            selected=""
            toggleSidebar={null}
            resourceView={ResourceView.Log}
          />
        </MemoryRouter>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it("renders warning", () => {
    let items = oneResourceView().Resources.map((res: any) => {
      res.BuildHistory[0].Error = ""
      res.BuildHistory[0].Warnings = ["warning"]
      return new SidebarItem(res)
    })
    let sidebar = mount(
      <MemoryRouter initialEntries={["/"]}>
        <Sidebar
          isClosed={false}
          items={items}
          selected=""
          toggleSidebar={null}
          resourceView={ResourceView.Log}
        />
      </MemoryRouter>
    )
    expect(sidebar.find("li Link.has-warnings")).toHaveLength(1)
  })
})

it("renders list of resources", () => {
  const tree = renderer
    .create(
      <MemoryRouter initialEntries={["/"]}>
        <SideBar
          isClosed={false}
          items={[
            { name: "foo", status: "pending" },
            { name: "bar", status: "pending" },
            { name: "baz", status: "pending" },
          ]}
          selected=""
          toggleSidebar={null}
          resourceView={ResourceView.Log}
        />
      </MemoryRouter>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
