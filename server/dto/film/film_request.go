package filmsdto

type FilmRequest struct {
	Title         string `json:"title" form:"title" gorm:"type:varchar(225)" validate:"required"`
	ThumbnailFilm string `json:"thumbnail" form:"thumbnail" gorm:"type:varchar(225)" validate:"required"`
	Year          int    `json:"year" form:"year" gorm:"type:int"`
	CategoryID    int    `json:"category_id" gorm:"type: int"`
	Description   string `json:"description" form:"description" gorm:"type:varchar(225)" validate:"required"`
}

type CreateFilmRequest struct {
	Title         string `json:"title" form:"title" validate:"required"`
	ThumbnailFilm string `json:"thumbnail" form:"thumbnail" validate:"required"`
	Year          int    `json:"year" form:"year"`
	CategoryID    int    `json:"category_id" form:"category_id"`
	Description   string `json:"description" form:"description"`
}

type UpdateFilmRequest struct {
	Title         string `json:"title" form:"title" validate:"required"`
	ThumbnailFilm string `json:"thumbnail" form:"thumbnail" validate:"required"`
	Year          int    `json:"year" form:"year"`
	CategoryID    int    `json:"category_id"`
	Description   string `json:"description" form:"description"`
}
