export interface TSubcategory {
  subcategory_id: string
  subcategory_name: string
  actions: {
    [key: string]: string
  }
}

export interface TCategory {
  category_id: string
  category_name: string
  subcategories: TSubcategory[]
}

export interface TInfo {
  name: string
  logo_url: string
  theme: {
    primaryColor: string
  }
}

export interface TOganization {
  organization_id: string
  organization_name?: string
  info: TInfo
  categories: TCategory[]
}

export interface TOrganizationItem {
  Item: TOrganization
}

export interface TOrganizationsItems {
  Items: TOrganization[]
}
