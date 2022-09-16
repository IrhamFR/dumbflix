package models

type Film struct {
	ID            int              `json:"id"`
	Title         string           `json:"title" gorm:"type:varchar(225)"`
	ThumbnailFilm string           `json:"thumbnailFilm" gorm:"type:varchar(225)"`
	Year          int              `json:"year" gorm:"type:int"`
	CategoryID    int              `json:"category_id" form:"category_id"`
	Category      CategoryResponse `json:"category"`
	Description   string           `json:"description" gorm:"type:varchar(225)"`
}

type FilmResponse struct {
	ID            int              `json:"id"`
	Title         string           `json:"title"`
	ThumbnailFilm string           `json:"thumbnailFilm"`
	Year          int              `json:"year"`
	CategoryID    int              `json:"category_id"`
	Category      CategoryResponse `json:"category"`
	Description   string           `json:"description"`
}

type FilmCategoryResponse struct {
	ID            int    `json:"id"`
	Title         string `json:"title"`
	ThumbnailFilm string `json:"thumbnailFilm"`
	Year          int    `json:"year"`
	CategoryID    int    `json:"category_id"`
	Description   string `json:"description"`
}

func (CategoryResponse) TableName() string {
	return "categories"
}

func (FilmCategoryResponse) TableName() string {
	return "films"
}

func (FilmResponse) TableName() string {
	return "films"
}
