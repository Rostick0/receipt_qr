<label class="flex items-start gap-x-6">
    @if ($label)
        <span>{{ $label }}</span>
    @endif
    <input class="input border-b border-solid border-black grow pb-2.5" type="{{ $type }}"
        placeholder="{{ $placeholder }}">
</label>
