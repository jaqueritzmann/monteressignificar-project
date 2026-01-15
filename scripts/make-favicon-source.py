#!/usr/bin/env python3
"""
Script para criar favicon-source-512.png otimizado a partir de logo512.png
Remove área transparente excessiva e centraliza o logo ocupando 85-90% do quadrado
"""

from PIL import Image
import os
import sys

def find_bounding_box(img):
    """Encontra o bounding box da área não-transparente"""
    # Converter para RGBA se necessário
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    # Encontrar pixels não-transparentes
    bbox = img.getbbox()
    if bbox is None:
        raise ValueError("Imagem completamente transparente")
    
    return bbox  # (left, top, right, bottom)

def create_optimized_favicon(input_path, output_path, target_size=512, margin_percent=0.08, fill_percent=0.88):
    """
    Cria um favicon otimizado removendo área transparente e centralizando
    
    Args:
        input_path: Caminho da imagem original
        output_path: Caminho de saída
        target_size: Tamanho final (512x512)
        margin_percent: Margem percentual ao redor do bbox (8%)
        fill_percent: Percentual da área que o logo deve ocupar (88%)
    """
    # Abrir imagem original
    img = Image.open(input_path)
    print(f"✓ Imagem original carregada: {img.size[0]}x{img.size[1]}")
    
    # Encontrar bounding box
    bbox = find_bounding_box(img)
    left, top, right, bottom = bbox
    logo_width = right - left
    logo_height = bottom - top
    
    print(f"✓ Bounding box detectado: ({left}, {top}, {right}, {bottom})")
    print(f"✓ Dimensões do logo: {logo_width}x{logo_height}")
    
    # Calcular margem
    margin_x = int(logo_width * margin_percent)
    margin_y = int(logo_height * margin_percent)
    
    # Expandir bbox com margem
    expanded_left = max(0, left - margin_x)
    expanded_top = max(0, top - margin_y)
    expanded_right = min(img.width, right + margin_x)
    expanded_bottom = min(img.height, bottom + margin_y)
    
    # Recortar área do logo com margem
    cropped = img.crop((expanded_left, expanded_top, expanded_right, expanded_bottom))
    cropped_width = expanded_right - expanded_left
    cropped_height = expanded_bottom - expanded_top
    
    print(f"✓ Área recortada: {cropped_width}x{cropped_height}")
    
    # Calcular tamanho do logo dentro do quadrado final (ocupando fill_percent)
    # O logo deve ocupar fill_percent da área, então o lado maior deve ser fill_percent * target_size
    max_dimension = max(cropped_width, cropped_height)
    target_logo_size = int(target_size * fill_percent)
    
    # Calcular fator de escala
    scale_factor = target_logo_size / max_dimension
    new_width = int(cropped_width * scale_factor)
    new_height = int(cropped_height * scale_factor)
    
    print(f"✓ Fator de escala: {scale_factor:.4f}")
    print(f"✓ Novo tamanho do logo: {new_width}x{new_height}")
    
    # Redimensionar mantendo proporção
    resized = cropped.resize((new_width, new_height), Image.Resampling.LANCZOS)
    
    # Criar canvas 512x512 transparente
    final_img = Image.new('RGBA', (target_size, target_size), (0, 0, 0, 0))
    
    # Centralizar o logo no canvas
    paste_x = (target_size - new_width) // 2
    paste_y = (target_size - new_height) // 2
    
    final_img.paste(resized, (paste_x, paste_y), resized)
    
    # Salvar
    final_img.save(output_path, 'PNG', optimize=True)
    file_size = os.path.getsize(output_path) / 1024
    print(f"✓ Favicon otimizado salvo: {output_path} ({file_size:.1f}KB)")
    
    return {
        'bbox': bbox,
        'scale_factor': scale_factor,
        'original_size': img.size,
        'cropped_size': (cropped_width, cropped_height),
        'final_size': (new_width, new_height)
    }

if __name__ == '__main__':
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    
    input_path = os.path.join(project_root, 'public', 'img', 'logo512.png')
    output_path = os.path.join(project_root, 'public', 'favicon-source-512.png')
    
    if not os.path.exists(input_path):
        print(f"✗ Erro: Arquivo não encontrado: {input_path}")
        sys.exit(1)
    
    print("=" * 60)
    print("Gerando favicon-source-512.png otimizado")
    print("=" * 60)
    
    try:
        result = create_optimized_favicon(input_path, output_path)
        print("\n" + "=" * 60)
        print("Resumo:")
        print(f"  Bounding box original: {result['bbox']}")
        print(f"  Fator de escala: {result['scale_factor']:.4f}")
        print(f"  Tamanho original: {result['original_size']}")
        print(f"  Tamanho recortado: {result['cropped_size']}")
        print(f"  Tamanho final do logo: {result['final_size']}")
        print("=" * 60)
    except Exception as e:
        print(f"✗ Erro: {e}")
        sys.exit(1)
