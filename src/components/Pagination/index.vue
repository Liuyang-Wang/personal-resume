<template>
  <div class="pagination">
    <button type="button" name="prev" title="prev" class="pagination-prev">
      <svg-icon icon-name="left-arrow"></svg-icon>
    </button>
    <ul class="pagination-pager clear-fix">
      <li class="pagination-pager-number">1</li>
      <li class="pagination-pager-number active">2</li>
      <li class="pagination-pager-number">3</li>
      <li class="pagination-pager-number">
        <svg-icon icon-name="more"></svg-icon>
      </li>
      <li class="pagination-pager-number">9</li>
    </ul>
    <button type="button" name="next" title="next" class="pagination-next">
      <svg-icon icon-name="right-arrow"></svg-icon>
    </button>
  </div>
</template>

<script>
// Math.ceil
export default {
  name: 'Pagination'
};
</script>

<style lang="scss" scoped>
@mixin active {
  background-color: $primary-color;
  color: #fff;
}

@mixin on-hover {
  &:hover {
    @include active;
  }
}

.pagination {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid rgba(39, 41, 43, 0.15);
  background-color: #fff;
  .svg-icon {
    width: $font-size;
    height: 20px;
  }
  &-pager {
    display: inline-block;
    vertical-align: middle;
    &-number {
      color: $font-color;
      font-size: $font-size;
      line-height: 20px;
      padding: 14px 16px;
      box-sizing: content-box;
      width: $font-size;
      height: 20px;
      cursor: pointer;
      float: left;
      background-color: transparent;
      border-radius: 4px;
      @include on-hover;
      &.active {
        @include active;
      }
    }
  }
  button {
    background-color: transparent;
    border: none;
    padding: 14px 16px;
    vertical-align: middle;
    font-size: 0;
    cursor: pointer;
    color: $font-color;
    transition: all 0.3s ease;
    border-radius: 4px;
    @include on-hover;
  }
}
</style>
