import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Modal de texto reutilizable (NovaCore). Usar con @if en el padre para reiniciar el valor al abrir.
 */
@Component({
  selector: 'app-input-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input-modal.component.html',
  styleUrl: './input-modal.component.sass',
})
export class InputModalComponent implements AfterViewInit {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() confirmLabel = 'Aceptar';
  @Input() cancelLabel = 'Cancelar';
  /** Clases Font Awesome del icono, ej. "fas fa-video" */
  @Input() iconClass = 'fas fa-keyboard';

  value = '';

  @ViewChild('fieldInput') fieldInput?: ElementRef<HTMLInputElement>;

  @Output() confirm = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  ngAfterViewInit(): void {
    setTimeout(() => this.fieldInput?.nativeElement?.focus(), 0);
  }

  get canSubmit(): boolean {
    return this.value.trim().length > 0;
  }

  onOverlayClick(): void {
    this.cancel.emit();
  }

  onConfirm(): void {
    if (!this.canSubmit) return;
    this.confirm.emit(this.value.trim());
  }

  onCancel(): void {
    this.cancel.emit();
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.canSubmit) {
      event.preventDefault();
      this.onConfirm();
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      this.onCancel();
    }
  }
}
