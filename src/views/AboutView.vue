<template>
  <div class="flex">
    <!-- Left Column -->
    <div class="w-2/3 p-4">
      <table class="w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th class="border p-2">#</th>
            <th class="border p-2">Action</th>
            <th class="border p-2">Sản phẩm</th>
            <th class="border p-2">Số lượng</th>
            <th class="border p-2">Giá</th>
            <th class="border p-2">Tổng</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in 3" :key="n" class="border-b">
            <td class="p-2">1</td>
            <td class="p-2"><a href="#" class="text-red-500">X</a></td>
            <td class="p-2">Áo len</td>
            <td class="p-2">3</td>
            <td class="p-2">888,888</td>
            <td class="p-2">5333,328</td>
          </tr>
        </tbody>
      </table>

      <div class="flex justify-between items-center mt-4">
        <div>
          <i class="fa fa-arrow-down"></i>
          <i class="fa fa-filter"></i>
        </div>
        <div>
          <span class="text-sm">1/1</span>
          <i class="fa fa-chevron-left"></i>
          <i class="fa fa-chevron-right"></i>
        </div>
      </div>
    </div>

    <!-- Right Column -->
    <div class="w-1/3 p-4 border-l">
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center">
          <i class="far fa-user-circle text-gray-500 mr-2"></i>
          <select class="border p-1">
            <option value="">Người bán</option>
          </select>
        </div>
        <span>08/07/2019 14:14</span>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <i class="fa fa-tag text-gray-600"></i>
          <select class="ml-2 border p-1">
            <option value="">Pricebook</option>
          </select>
        </div>
        <i class="fas fa-shopping-basket text-gray-600"></i>
      </div>
    </div>
  </div>
</template>

<style>
</style>
