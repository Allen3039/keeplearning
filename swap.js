const swap = (arr,idxTarget,idxSource) => {
  arr[idxSource]=arr.splice(idxTarget,1,arr[idxSource])[0];
 return arr; 
}