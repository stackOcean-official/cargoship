# You can learn more about package authoring with RStudio at:
#
#   http://r-pkgs.had.co.nz/
#
# Some useful keyboard shortcuts for package authoring:
#
#   Install Package:           'Cmd + Shift + B'
#   Check Package:             'Cmd + Shift + E'
#   Test Package:              'Cmd + Shift + T'

#' Host Function
#'
#' This function uploads your model to the hostr cloud
#' @param model Your R model
#' @param domain Domain, where hoster cloud is hosted (defaults to hostr.so)
#' @keywords host
#' @export
#' @examples
#' host(model)
#' host(model, "hostr.example.com")
host <- function(model, domain="hostr.so") {
  # TODO
  print("You can reach your model at https://hostr.so/UjdD2d")
}
