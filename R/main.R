library(jsonlite)
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
  model_atributte = paste(attr(model$terms, "predvars"))
  model_label = model_atributte[-1]
  print(model_label)
  input_label = model_label[-1]
  print(input_label)
  input_count = length(input_label)
  print(input_count)
  data_type = c()
  for (data in model$data){
    print(typeof(data))
    data_type = append(data_type, typeof(data))
  }
  values = cbind(model_label, data_type)
  values = data.frame(values)
  names(values)[names(values) == 'model_label'] = 'variable'
  names(values)[names(values) == 'data_type'] = 'type'
  print(values)
}



